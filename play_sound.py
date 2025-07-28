import pygame
import os

def main():
    # Initialize pygame mixer
    pygame.mixer.init()
    
    # Check if the sound file exists
    sound_file = "ulala.wav"
    if not os.path.exists(sound_file):
        print(f"Error: {sound_file} not found in current directory")
        return
    
    try:
        # Load and play the sound
        sound = pygame.mixer.Sound(sound_file)
        sound.play()
        
        # Wait for the sound to finish playing
        while pygame.mixer.get_busy():
            pygame.time.wait(100)
            
        print(f"Played {sound_file}")
    except pygame.error as e:
        print(f"Error playing sound: {e}")
    finally:
        pygame.mixer.quit()


if __name__ == "__main__":
    main()
