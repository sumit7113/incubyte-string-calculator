export default function AddFunction(numbers: string): number {
    // Replace escaped newlines with actual newline characters
    numbers = numbers.replace(/\\n/g, "\n");
  
    if (!numbers.trim()) {
      return 0;
    }
  
    let delimiter = /[,\s]+|\n/; // Default delimiter (spaces, commas, new lines)
  
    // Check if the input string starts with a custom delimiter
    if (numbers.startsWith("//")) {
      const delimiterEndIndex = numbers.indexOf("\n");
      const customDelimiter = numbers.slice(2, delimiterEndIndex);
      delimiter = new RegExp(
        `[${customDelimiter.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&")}]`
      ); // Escape special regex characters
      numbers = numbers.slice(delimiterEndIndex + 1); //Remove delimiter declaration
    }
  
    //Trim the numbers string to remove any leading or trailing spaces
    numbers = numbers.trim();
  
    // Split the string by the current delimiter
    const numArray = numbers.split(delimiter);
  
    // Find negative numbers
    const negativeNumbers = numArray.filter((num) => parseFloat(num) < 0);
    // Filter unique negative numbers
    const uniqueNegativeNumbers = negativeNumbers.filter((item, index) => negativeNumbers.indexOf(item) === index);
  
    // If there are negative numbers, throw an exception
    if (uniqueNegativeNumbers.length > 0) {
      throw new Error(
        `Negative numbers not allowed: ${uniqueNegativeNumbers.join(", ")}`
      );
    }
  
    // Convert the array of strings to an array of numbers and sum them up
    const sum = numArray.reduce((acc, curr) => acc + parseFloat(curr), 0);

    if(Number.isNaN(sum)){
        throw new Error(
            `Please enter valid input`
          );
    }
  
    return sum;
  }