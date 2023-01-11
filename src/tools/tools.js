
// Create a function called 'nameImporter' to add a first and last name to the database
function nameImporter() {
    // Create a variable called 'name' that will store the user's input
    var name = prompt("Please enter your name");
    // Create a variable called 'nameArray' that will store the user's input as an array
    var nameArray = name.split(" ");
    // Create a variable called 'firstName' that will store the first name of the user
    var firstName = nameArray[0];
    // Create a variable called 'lastName' that will store the last name of the user
    var lastName = nameArray[1];
    // Create a variable called 'nameObject' that will store the first and last name of the user as an object
    var nameObject = {
        firstName: firstName,
        lastName: lastName
    };
    // Return the object
    return nameObject;
};

module.exports = {
    nameImporter,
};