> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details
Project name: Mock
Sophia Lim (szlim), Melanie Michael (mamichae)
Hours spent: 12? idk
Repo link: https://github.com/cs0320-s24/mock-mamichae-szlim

# Design Choices
The App class contains the LoginButton and REPL components. 
The primary classes of our project include the components REPL, which handles the entire interface, and contains the components REPLInput and REPLHistory, which handle the input commands provided by the user, and the displayed history of commands and output, respectively. 
Both REPLInput and REPLHistory work with the interface HistoryLog, which provides an array structure that holds commands and their corresponding output. When the submit button is clicked, REPLInput adds the command and corresponding output to the HistoryLog, thanks to the values returned by the component ControlledInput. As REPLInput re-renders, so does REPL, and therefore REPLHistory, who also takes in the HistoryLog as props, and updates the display to showcase the appropriate addition. 
For handling commands, REPLInput uses the interface REPLFunction, which is the component that manages and execute command functionality. The structure of REPLFunction is that it accepts an array of strings (command arguments) and may return either a string, a 2D array of strings, or a JSX element (representing the output of the command). This allows for other developers to easily add their own commands, with a variety of output types. The command ToggleMode is also included in the commands map, which allows the user to change between brief and verbose mode. 
The commands already included in the code for managing the CSV data are the components Load, View, and Search. The functionality of these components are called in REPLFunction, however, the actual functionality is not implemented as they are mocked. 
The files MockedCSVs and MockedSearchResults contain mocked data for viewing and mocked search commands and results, in order to test the front end functionality without testing the backend. 

# Errors/Bugs
Currently cant handle searching for values with spaces. ie, you can have the search value "sophia" but not "sophia melanie". We think this logic is better handled in the backend.

# Tests
- Check to see there is a login button upon page loading.
- Check to see they can't see the command input box until after they are logged in.
- Check a submit button is visible after logging in
- Can sign in and sign out multiple times
- Check functionality of "mode" command and ensure both brief and verbose modes display appropriate output.
- Checks ouput when you click submit with no command input
- Checks ouput when you click submit with unknown command input
- Check successful loading of a file
- Check "load_file" command with not enough arguments
- Check "load_file" command with too many arguments
- Check output when you load a file not found
- Check output when loading a malformed CSV
- Check output when loading an empty CSV
- Check successful "view" 
- Check view in both modes
- Check output when trying to view an unloaded csv
- Check "view" command with incorrect arguments
- Check search command with one row output
- Check search command with multiple row outputs
- Check search using a string as the column identifier
- Check search using an index column identifier
- Check search when no results are found
- Check trying to search an unloaded file
- Check searching two different queries on the same csv
- Check viewing and searching on a csv with one column
- Check loading, viewing, and searching all together
- Check loading and viewing multiple different datasets in the same sequence
- Check loading and searching multiple different datasets in the same sequence
- Check view command in both modes
- Check search commandin both modes



# How to
To use the program, open the Mock web app in the browser and click the Login button. The application will begin in brief mode, meaning that only the output will be present on the screen. In the box that states "Enter a command", first enter the command `load_file <file to load>`. If the file is found and loaded, a message will appear on screen stating "loaded successfully". To view the data, enter `view`. To search, either by column id or column name, enter the command `search <column> <value>`. To change to between modes, enter `mode`. Verbose mode will show all commands and corresponding outputs. To sign out of the application, click the sign out button. 

<<<<<<< HEAD
# Collaboration
*(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)*
    for splitting / parsing command input 
    https://www.tutorialspoint.com/typescript/typescript_string_split.htm

    for asserting non-null
    https://www.geeksforgeeks.org/typescript-non-null-assertion-operator-postfix-type/#:~:text=TypeScript%20non%2Dnull%20assertion%20operator%20(!)%20is%20used%20to%20assert,time%20null%20and%20undefined%20checks.
=======
To add a new command, create a new JSX component (tsx) file that will return what is to be displayed. Create and add the new command to commands map by navigating to the component REPLFunction and adding the new command (the JSX component) to the commandsObject. The key should be the name of the command, and the corresponding value should represent the expected output. To run the new command, in the command-line interface, type the name of the new command (what was specficied as the key value), and any additional arguments needed. 

# Collaboration
>>>>>>> 5299eb0de7fe37d5e11264d9304bc8ad43292965

- for splitting / parsing command input https://www.tutorialspoint.com/typescript/typescript_string_split.htm
- for asserting non-null https://www.geeksforgeeks.org/typescript-non-null-assertion-operator-postfix-type/#:~:text=TypeScript%20non%2Dnull%20assertion%20operator%20(!)%20is%20used%20to%20assert,time%20null%20and%20undefined%20checks.
- slicing array https://refine.dev/blog/javascript-slice/
- useEffect https://legacy.reactjs.org/docs/hooks-effect.html 
- testing tables in playwright https://testerops.com/playwright-table-handling-1/
- promise all for testing tables in playwright https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all