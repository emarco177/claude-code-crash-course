/**
 * Content Loader
 * Loads learning content from the file system
 */

import fs from "fs";
import path from "path";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface PathConfig {
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  iconUrl?: string;
  xpReward: number;
  order: number;
  isPublished: boolean;
  isPremium: boolean;
  modules: ModuleConfig[];
}

export interface ModuleConfig {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes: number;
  lessons?: LessonConfig[];
}

export interface LessonConfig {
  slug: string;
  title: string;
  order: number;
  contentType: string;
  estimatedMinutes: number;
  xpReward: number;
}

export interface LessonContent {
  slug: string;
  title: string;
  content: string;
  contentType: string;
  estimatedMinutes: number;
  xpReward: number;
  data?: Record<string, unknown>;
}

/**
 * Get all learning paths
 */
export function getAllPaths(): PathConfig[] {
  const pathsDir = path.join(CONTENT_ROOT, "learning-paths");

  if (!fs.existsSync(pathsDir)) {
    return [];
  }

  const pathDirs = fs.readdirSync(pathsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const paths: PathConfig[] = [];

  for (const pathDir of pathDirs) {
    const configPath = path.join(pathsDir, pathDir, "config.json");

    if (fs.existsSync(configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        paths.push(config);
      } catch (error) {
        console.error(`Error loading path config: ${pathDir}`, error);
      }
    }
  }

  return paths.sort((a, b) => a.order - b.order);
}

/**
 * Get a specific learning path by slug
 */
export function getPathBySlug(slug: string): PathConfig | null {
  const configPath = path.join(
    CONTENT_ROOT,
    "learning-paths",
    slug,
    "config.json"
  );

  if (!fs.existsSync(configPath)) {
    return null;
  }

  try {
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    // Load module details
    const modulesDir = path.join(
      CONTENT_ROOT,
      "learning-paths",
      slug,
      "modules"
    );

    if (fs.existsSync(modulesDir)) {
      config.modules = config.modules.map((module: ModuleConfig) => {
        const moduleConfigPath = path.join(
          modulesDir,
          module.id,
          "module.json"
        );

        if (fs.existsSync(moduleConfigPath)) {
          const moduleConfig = JSON.parse(
            fs.readFileSync(moduleConfigPath, "utf-8")
          );
          return { ...module, lessons: moduleConfig.lessons || [] };
        }

        return module;
      });
    }

    return config;
  } catch (error) {
    console.error(`Error loading path: ${slug}`, error);
    return null;
  }
}

/**
 * Get lesson content
 */
export function getLessonContent(
  pathSlug: string,
  moduleId: string,
  lessonSlug: string
): LessonContent | null {
  const lessonsDir = path.join(
    CONTENT_ROOT,
    "learning-paths",
    pathSlug,
    "modules",
    moduleId,
    "lessons"
  );

  const moduleConfigPath = path.join(
    CONTENT_ROOT,
    "learning-paths",
    pathSlug,
    "modules",
    moduleId,
    "module.json"
  );

  let lessonMeta: LessonConfig | undefined;
  if (fs.existsSync(moduleConfigPath)) {
    try {
      const moduleConfig = JSON.parse(
        fs.readFileSync(moduleConfigPath, "utf-8")
      );
      lessonMeta = moduleConfig.lessons?.find(
        (l: LessonConfig) => l.slug === lessonSlug
      );
    } catch (error) {
      console.error("Error reading module config for lesson", lessonSlug, error);
    }
  }

  // Try markdown first
  const mdPath = path.join(lessonsDir, `${lessonSlug}.md`);
  if (fs.existsSync(mdPath)) {
    try {
      const content = fs.readFileSync(mdPath, "utf-8");

      if (lessonMeta) {
        return {
          slug: lessonSlug,
          title: lessonMeta.title,
          content,
          contentType: lessonMeta.contentType || "ARTICLE",
          estimatedMinutes: lessonMeta.estimatedMinutes,
          xpReward: lessonMeta.xpReward,
        };
      }

      return {
        slug: lessonSlug,
        title: lessonSlug,
        content,
        contentType: "ARTICLE",
        estimatedMinutes: 15,
        xpReward: 50,
      };
    } catch (error) {
      console.error(`Error loading lesson: ${lessonSlug}`, error);
      return null;
    }
  }

  // Try JSON for quizzes
  const jsonPath = path.join(lessonsDir, `${lessonSlug}.json`);
  if (fs.existsSync(jsonPath)) {
    try {
      const content = fs.readFileSync(jsonPath, "utf-8");
      const parsedData = JSON.parse(content);
      const contentType =
        lessonMeta?.contentType ||
        parsedData.contentType ||
        parsedData.type ||
        "QUIZ";

      return {
        slug: lessonSlug,
        title: lessonMeta?.title || parsedData.title || lessonSlug,
        content,
        contentType,
        estimatedMinutes:
          lessonMeta?.estimatedMinutes ||
          parsedData.estimatedMinutes ||
          10,
        xpReward: lessonMeta?.xpReward || parsedData.xpReward || 50,
        data: parsedData,
      };
    } catch (error) {
      console.error(`Error loading quiz: ${lessonSlug}`, error);
      return null;
    }
  }

  return null;
}

/**
 * Get all modules for a path
 */
export function getPathModules(pathSlug: string): ModuleConfig[] {
  const path = getPathBySlug(pathSlug);
  return path?.modules || [];
}
