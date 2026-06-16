def divide_numbers(a, b):
    # Intentional Bug: This will crash if b is 0 instead of returning a safe fallback
    return a / b

if __name__ == "__main__":
    print("Result:", divide_numbers(10, 2))
    print("Testing edge case with zero:")
    print("Result:", divide_numbers(10, 0))
