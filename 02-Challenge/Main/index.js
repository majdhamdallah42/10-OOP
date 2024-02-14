const fs = require('fs');
const inquirer = require('inquirer');
const { Circle, Square, Triangle } = require('./lib/shapes');

class Svg {
    constructor() {
        this.textElement = '';
        this.shapeElement = '';
    }

    render() {
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
    }

    setTextElement(text, color) {
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
    }

    setShapeElement(shape) {
        this.shapeElement = shape.render();
    }
}

const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'TEXT: Enter up to (3) Characters:',
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'TEXT COLOR: Enter a color keyword (OR a hexadecimal number):',
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'SHAPE COLOR: Enter a color keyword (OR a hexadecimal number):',
    },
    {
        type: 'list',
        name: 'pixelImage',
        message: 'Choose which Pixel Image you would like?',
        choices: ['Circle', 'Square', 'Triangle'],
    },
];

function writeToFile(fileName, data) {
    console.log(`Writing [${data}] to file [${fileName}]`);
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('Congratulations, you have Generated a logo.svg!');
    });
}

async function init() {
    console.log('Starting init');
    const svgFile = 'logo.svg';

    const answers = await inquirer.prompt(questions);

    const userText = answers.text;
    if (userText.length < 1 || userText.length > 3) {
        console.log('Invalid user text field detected! Please enter 1-3 Characters, no more and no less');
        return;
    }

    const userFontColor = answers.textColor;
    console.log(`User font color: [${userFontColor}]`);

    const userShapeColor = answers.shapeColor;
    console.log(`User shape color: [${userShapeColor}]`);

    const userShapeType = answers.pixelImage.toLowerCase();
    console.log(`User entered shape = [${userShapeType}]`);

    let userShape;
    switch (userShapeType) {
        case 'square':
            userShape = new Square();
            console.log('User selected Square shape');
            break;
        case 'circle':
            userShape = new Circle();
            console.log('User selected Circle shape');
            break;
        case 'triangle':
            userShape = new Triangle();
            console.log('User selected Triangle shape');
            break;
        default:
            console.log('Invalid shape!');
    }
    userShape.setColor(userShapeColor);

    const svg = new Svg();
    svg.setTextElement(userText, userFontColor);
    svg.setShapeElement(userShape);
    const svgString = svg.render();

    console.log('Displaying shape:\n\n' + svgString);
    console.log('Shape generation complete!');
    console.log('Writing shape to file...');
    writeToFile(svgFile, svgString);
}

init();
// Majd