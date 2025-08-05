def fibonacci(n):
    """
    Calculate the nth Fibonacci number.
    
    Args:
        n: The position in the Fibonacci sequence
        
    Returns:
        The nth Fibonacci number
    """
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b


def main():
    # Test the Fibonacci function
    print("Fibonacci Sequence:")
    for i in range(10):
        print(f"F({i}) = {fibonacci(i)}")
    
    # Calculate a specific Fibonacci number
    n = 20
    print(f"\nThe {n}th Fibonacci number is: {fibonacci(n)}")


if __name__ == "__main__":
    main()