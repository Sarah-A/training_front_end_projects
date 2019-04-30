# JavaScript and React Calculator
This project is one of the final projects in the Free Code Camp Front End Libraries Course.
In this project, I've created a calculator app using:
* HTML, CSS, SASS, JavaScript, Bootstrap, jQuery
* ReactJS, Redux, Thunk 

## Requirements
For the complete instuctions for this project, see the [Project Instructions file](./project_instructions.txt) 
In addition to the requirements in the instructions document, I've implemented the followings:
* Support Backspace with the same logic as windows calculator (works only on numbers and set the number to 0 once finished backspacing it)
* Except keyboard keys for all buttons with "delete" for clear and enter for '='.  

**NOTE**:
```
One of the project's requirements was to deploy it on CodePen. Therefore, I had to put all my code into one .js and one .css files. In order to workaround this issue, I've used comments in the code to show where it should be in a real project.  
```

## View Deployed Project:
You can access the deployed project and code on: <https://codepen.io/sarah-a/pen/RdwZXY>

## Development Environment:

### Installations
Make sure that the following tools are installed on your system in order to clone the code and develop/debug it on your PC:
1. Git (<http://git-scm.com/downloads>)
1. Node.JS (<https://nodejs.org/en/download/>)
1. You can also install VS Code IDE for development (not required): <https://code.visualstudio.com/download>

### Clone and Run Project
1. Clone the repository: 
    ```
    > git clone https://github.com/Sarah-A/front_end_projects
    ```  
1. Open command line (or through VS Code Terminal) and browse to the project's directory (`front_end_projects/front_end_projects/calculator_react_redux_thunk`) 
1. Run the following commands in order: 
    * Install all the required JS packages in your project: 
        ```
        > npm install
        ``` 
    * compile the SASS file to CSS:
        ```
        > node-sass src/styles/default.scss src/styles/default.css
        ```
    * Run the application:
        ```
        > npm start
        ``` 
1. Your default browser should open automatically to the correct address. If it doesn't, look for the 'Project is running at: [address]' line in the output and enter the [address] in your browser. 


## Testing

In addition to running the project's tests in https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js, I've run the following manual tests:
1. = without input or with just a number will display [num]=[num]
1. operator at the end of the input (just before the '=') will be ignored in the calculation
1. changing the last operator will save the last operator entered.
1. writing multiple 0s e.g 0000035 will display 35
1. enter new number after the last '=' will start a new calculation
1. enter a new operator after the last '=' will start a new calculation with the previous result as the initial input.
1. enter . will translate it to 0.
1. don't accept multiple decimal points in the same number