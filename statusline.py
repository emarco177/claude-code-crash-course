#!/usr/bin/env python3
import json
import sys
import os

def get_last_user_prompt(transcript_path):
    """Extract the last user prompt from the transcript file."""
    try:
        if not os.path.exists(transcript_path):
            return "No transcript found"
        
        with open(transcript_path, 'r') as f:
            content = f.read().strip()
        
        if not content:
            return "Empty transcript"
        
        # Split by lines and process each JSON object
        lines = content.strip().split('\n')
        user_prompts = []
        
        for line in lines:
            try:
                entry = json.loads(line)
                # Check if this is a user message and not a command
                if (entry.get('type') == 'user' and 
                    entry.get('message', {}).get('role') == 'user'):
                    
                    message_content = entry.get('message', {}).get('content', '')
                    
                    # Handle both string and list content formats
                    content_text = ''
                    if isinstance(message_content, str):
                        content_text = message_content
                    elif isinstance(message_content, list):
                        # Extract text from content blocks
                        for block in message_content:
                            if isinstance(block, dict) and block.get('type') == 'text':
                                content_text += block.get('text', '')
                    
                    # Skip command messages and meta messages
                    if (content_text and
                        not content_text.startswith('<command-name>') and 
                        not content_text.startswith('<local-command-stdout>') and
                        not entry.get('isMeta', False) and
                        content_text.strip()):
                        user_prompts.append(content_text.strip())
            except json.JSONDecodeError:
                continue
        
        if user_prompts:
            # Return the last user prompt, truncated if too long
            last_prompt = user_prompts[-1]
            if len(last_prompt) > 50:
                return last_prompt[:47] + "..."
            return last_prompt
        else:
            return "No user prompts found"
            
    except Exception as e:
        return f"Error reading transcript: {str(e)}"

def main():
    try:
        # Read JSON input from stdin
        input_data = json.load(sys.stdin)
        
        # Extract the output style name
        output_style = input_data.get('output_style', {}).get('name', 'default')
        
        # Extract the transcript path
        transcript_path = input_data.get('transcript_path', '')
        
        # Get the last user prompt
        last_prompt = get_last_user_prompt(transcript_path)
        
        # Display the output style and last prompt
        print(f"\033[1;32mStyle: {output_style}\033[0m \033[1;36mLast Prompt: {last_prompt}\033[0m")
        
    except Exception as e:
        # Fallback in case of any errors
        print("\033[1;32mStyle: unknown\033[0m \033[1;36mLast: error\033[0m")

if __name__ == "__main__":
    main()