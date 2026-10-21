
const studentName = "Shadiyar";
let age = 21;
const active = true;

const courses = [
    "JavaScript",
    "React",
    "Data Science"
];

const address = {
    city: "Almaty",
    street: "Abay"
};

const emptyValue = null;
let undefinedValue;

const sentence = `${studentName} is ${age} years old and studies in ${address.city}.`;

const variablesResult = document.getElementById("variables-result");

variablesResult.innerHTML = `
    <div class="result">
        <p><strong>name:</strong> ${studentName} — ${typeof studentName}</p>
        <p><strong>age:</strong> ${age} — ${typeof age}</p>
        <p><strong>active:</strong> ${active} — ${typeof active}</p>
        <p><strong>courses:</strong> ${courses.join(", ")} — ${typeof courses}</p>
        <p><strong>address:</strong> ${address.city} — ${typeof address}</p>
        <p><strong>null:</strong> ${emptyValue} — ${typeof emptyValue}</p>
        <p><strong>undefined:</strong> ${undefinedValue} — ${typeof undefinedValue}</p>
        <p><strong>Template literal:</strong> ${sentence}</p>
    </div>
`;



const numbers = [3, 7, 2, 10, 5];

// map
const doubledNumbers = numbers.map(number => number * 2);

// filter
const greaterThanFive = numbers.filter(number => number > 5);

// find
const firstGreaterThanFive = numbers.find(number => number > 5);

// reduce
const numbersSum = numbers.reduce((total, number) => total + number, 0);

// includes
const hasTen = numbers.includes(10);

document.getElementById("arrays-result").innerHTML = `
    <div class="result">
        <p><strong>Original:</strong> ${numbers.join(", ")}</p>
        <p><strong>map × 2:</strong> ${doubledNumbers.join(", ")}</p>
        <p><strong>filter > 5:</strong> ${greaterThanFive.join(", ")}</p>
        <p><strong>find > 5:</strong> ${firstGreaterThanFive}</p>
        <p><strong>reduce sum:</strong> ${numbersSum}</p>
        <p><strong>includes 10:</strong> ${hasTen}</p>
    </div>
`;



const students = [
    { id: 1, name: "Anna", grade: 85 },
    { id: 2, name: "John", grade: 62 },
    { id: 3, name: "Sara", grade: 91 },
    { id: 4, name: "Mike", grade: 55 }
];

// Students with grade >= 70
const passedStudents = students.filter(student => student.grade >= 70);

// Student names
const studentNames = students.map(student => student.name);

// Student with id = 3
const studentId3 = students.find(student => student.id === 3);

// Student with highest grade
const topStudent = students.reduce((best, student) => {
    return student.grade > best.grade ? student : best;
});

// Average grade
const averageGrade =
    students.reduce((total, student) => total + student.grade, 0)
    / students.length;

// New array without modifying original objects
const studentsWithPassed = students.map(student => ({
    ...student,
    passed: student.grade >= 70
}));

document.getElementById("students-result").innerHTML = `
    <div class="result">
        <p>
            <strong>Grade >= 70:</strong>
            ${passedStudents.map(student => student.name).join(", ")}
        </p>

        <p>
            <strong>Names:</strong>
            ${studentNames.join(", ")}
        </p>

        <p>
            <strong>ID = 3:</strong>
            ${studentId3.name}, grade ${studentId3.grade}
        </p>

        <p>
            <strong>Highest grade:</strong>
            ${topStudent.name} — ${topStudent.grade}
        </p>

        <p>
            <strong>Average grade:</strong>
            ${averageGrade.toFixed(2)}
        </p>

        <p>
            <strong>Passed array:</strong>
            ${studentsWithPassed
                .map(student => `${student.name}: ${student.passed}`)
                .join(", ")}
        </p>
    </div>
`;



const user = {
    id: 1,
    name: "Alice",
    age: 20,
    address: {
        city: "Almaty",
        street: "Abay"
    }
};

// Read name and city
const userNameValue = user.name;
const userCity = user.address.city;

// Change age
user.age = 21;

// Add email
user.email = "alice@example.com";

// Remove street
delete user.address.street;

// Destructuring
const { name, age: userAge } = user;

// Nested destructuring
const {
    address: { city }
} = user;

// Rename name to userName
const { name: userName } = user;

document.getElementById("objects-result").innerHTML = `
    <div class="result">
        <p><strong>Name:</strong> ${userNameValue}</p>
        <p><strong>City:</strong> ${userCity}</p>
        <p><strong>New age:</strong> ${user.age}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Destructuring:</strong> ${name}, ${userAge}</p>
        <p><strong>Nested destructuring:</strong> ${city}</p>
        <p><strong>Renamed variable:</strong> ${userName}</p>
    </div>
`;



const original = {
    name: "Alice",
    score: 10
};

const copy = original;

copy.score = 20;


const spreadCopy = {
    ...original
};

spreadCopy.score = 50;


// Nested object
const nestedUser = {
    name: "Alice",
    address: {
        city: "Almaty"
    }
};

const shallowCopy = {
    ...nestedUser
};

shallowCopy.address.city = "Astana";

const deepCopy = {
    ...nestedUser,
    address: {
        ...nestedUser.address
    }
};

deepCopy.address.city = "Shymkent";

document.getElementById("references-result").innerHTML = `
    <div class="result">
        <p>
            <strong>Original after copy.score = 20:</strong>
            ${original.score}
        </p>

        <p>
            <strong>Spread copy score:</strong>
            ${spreadCopy.score}
        </p>

        <p>
            <strong>Original nested city after shallow copy:</strong>
            ${nestedUser.address.city}
        </p>

        <p>
            <strong>Deep copy city:</strong>
            ${deepCopy.address.city}
        </p>
    </div>
`;



function isEven(number) {
    return number % 2 === 0;
}

// Arrow function
const getFullName = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
};

function calculatePrice(price, quantity) {
    return price * quantity;
}

function calculateDiscount(price, percent) {
    return price - (price * percent / 100);
}

function getMax(a, b) {
    return Math.max(a, b);
}

document.getElementById("functions-result").innerHTML = `
    <div class="result">
        <p><strong>isEven(10):</strong> ${isEven(10)}</p>
        <p><strong>getFullName:</strong> ${getFullName("John", "Smith")}</p>
        <p><strong>calculatePrice:</strong> ${calculatePrice(100, 3)}</p>
        <p><strong>calculateDiscount:</strong> ${calculateDiscount(100, 20)}</p>
        <p><strong>getMax:</strong> ${getMax(10, 25)}</p>
    </div>
`;



function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function calculate(a, b, operation) {
    return operation(a, b);
}

const addResult = calculate(5, 3, add);
const multiplyResult = calculate(5, 3, multiply);

document.getElementById("function-values-result").innerHTML = `
    <div class="result">
        <p><strong>calculate(5, 3, add):</strong> ${addResult}</p>
        <p><strong>calculate(5, 3, multiply):</strong> ${multiplyResult}</p>
        <p><strong>add:</strong> function itself</p>
        <p><strong>add():</strong> calls the function</p>
    </div>
`;

const globalMessage = "global";

function testScope() {

    const functionMessage = "function";

    let result = `
        <p>Global: ${globalMessage}</p>
        <p>Function: ${functionMessage}</p>
    `;

    if (true) {

        const blockMessage = "block";

        result += `
            <p>Block: ${blockMessage}</p>
        `;
    }

    return result;
}

document.getElementById("scope-result").innerHTML = `
    <div class="result">
        ${testScope()}

        <p>
            <strong>var:</strong>
            function scoped
        </p>

        <p>
            <strong>let:</strong>
            block scoped
        </p>

        <p>
            <strong>const:</strong>
            block scoped
        </p>
    </div>
`;


function createCounter() {

    let count = 0;

    return function () {
        count++;
        return count;
    };
}

const counter = createCounter();

const counterResult = [
    counter(),
    counter(),
    counter()
];

const anotherCounter = createCounter();

const anotherCounterResult = [
    anotherCounter(),
    anotherCounter()
];


function createAdder(value) {

    return function (number) {
        return value + number;
    };
}

const addFive = createAdder(5);

document.getElementById("closure-result").innerHTML = `
    <div class="result">

        <p>
            <strong>Counter:</strong>
            ${counterResult.join(", ")}
        </p>

        <p>
            <strong>Another counter:</strong>
            ${anotherCounterResult.join(", ")}
        </p>

        <p>
            <strong>addFive(10):</strong>
            ${addFive(10)}
        </p>

        <p>
            <strong>addFive(20):</strong>
            ${addFive(20)}
        </p>

    </div>
`;



const numbers2 = [10, 20, 30, 40];


const [first, second] = numbers2;


const newNumbers = [...numbers2, 50];

const user2 = {
    id: 1,
    name: "Anna",
    age: 21
};

const newUser = {
    ...user2,
    age: 22
};


const userWithEmail = {
    ...user2,
    email: "anna@example.com"
};


const array1 = [1, 2];
const array2 = [3, 4];

const combinedArray = [...array1, ...array2];



function sum(...numbers) {
    return numbers.reduce((total, number) => total + number, 0);
}

document.getElementById("spread-result").innerHTML = `
    <div class="result">

        <p>
            <strong>First two:</strong>
            ${first}, ${second}
        </p>

        <p>
            <strong>New numbers:</strong>
            ${newNumbers.join(", ")}
        </p>

        <p>
            <strong>New user:</strong>
            ${newUser.name}, age ${newUser.age}
        </p>

        <p>
            <strong>User with email:</strong>
            ${userWithEmail.email}
        </p>

        <p>
            <strong>Combined arrays:</strong>
            ${combinedArray.join(", ")}
        </p>

        <p>
            <strong>sum(1, 2):</strong>
            ${sum(1, 2)}
        </p>

        <p>
            <strong>sum(1, 2, 3, 4):</strong>
            ${sum(1, 2, 3, 4)}
        </p>

    </div>
`;



const userWithAddress = {
    name: "Anna",
    address: {
        city: "Almaty"
    }
};

const userWithoutAddress = {
    name: "John"
};



const city1 = userWithAddress.address?.city ?? "City not specified";

const city2 =
    userWithoutAddress.address?.city
    ?? "City not specified";


const orResults = {
    zero: 0 || "default",
    emptyString: "" || "default",
    false: false || "default",
    null: null || "default",
    undefined: undefined || "default"
};

const nullishResults = {
    zero: 0 ?? "default",
    emptyString: "" ?? "default",
    false: false ?? "default",
    null: null ?? "default",
    undefined: undefined ?? "default"
};

document.getElementById("optional-result").innerHTML = `
    <div class="result">

        <p>
            <strong>User with address:</strong>
            ${city1}
        </p>

        <p>
            <strong>User without address:</strong>
            ${city2}
        </p>

        <p><strong>Using ||:</strong></p>
        <p>0 → ${orResults.zero}</p>
        <p>"" → ${orResults.emptyString}</p>
        <p>false → ${orResults.false}</p>
        <p>null → ${orResults.null}</p>
        <p>undefined → ${orResults.undefined}</p>

        <p><strong>Using ??:</strong></p>
        <p>0 → ${nullishResults.zero}</p>
        <p>"" → ${nullishResults.emptyString}</p>
        <p>false → ${nullishResults.false}</p>
        <p>null → ${nullishResults.null}</p>
        <p>undefined → ${nullishResults.undefined}</p>

    </div>
`;



const finalStudents = [
    {
        id: 1,
        name: "Anna",
        age: 20,
        grades: [80, 90, 85]
    },
    {
        id: 2,
        name: "John",
        age: 21,
        grades: [60, 65, 70]
    },
    {
        id: 3,
        name: "Sara",
        age: 20,
        grades: [90, 95, 92]
    },
    {
        id: 4,
        name: "Mike",
        age: 22,
        grades: [50, 55, 60]
    },
    {
        id: 5,
        name: "Emma",
        age: 21,
        grades: [75, 80, 78]
    }
];



function getAverage(grades) {

    return grades.reduce(
        (total, grade) => total + grade,
        0
    ) / grades.length;
}



function getStudentAverage(student) {

    return getAverage(student.grades);
}



function getPassedStudents(students) {

    return students.filter(
        student => getStudentAverage(student) >= 70
    );
}



function getStudentNames(students) {

    return students.map(
        student => student.name
    );
}



function findStudent(students, id) {

    return students.find(
        student => student.id === id
    );
}


function getTopStudent(students) {

    return students.reduce(
        (best, student) => {
            return getStudentAverage(student)
                > getStudentAverage(best)
                ? student
                : best;
        }
    );
}


const finalResult = finalStudents.map(student => ({
    id: student.id,
    name: student.name,
    average: getStudentAverage(student),
    passed: getStudentAverage(student) >= 70
}));


const finalTopStudent = getTopStudent(finalStudents);

const finalPassedStudents =
    getPassedStudents(finalStudents);

const finalNames =
    getStudentNames(finalStudents);

const finalFoundStudent =
    findStudent(finalStudents, 3);


document.getElementById("final-result").innerHTML = `
    <div class="result">

        <p>
            <strong>Student names:</strong>
            ${finalNames.join(", ")}
        </p>

        <p>
            <strong>Passed students:</strong>
            ${finalPassedStudents
                .map(student => student.name)
                .join(", ")}
        </p>

        <p>
            <strong>Student with ID 3:</strong>
            ${finalFoundStudent.name}
        </p>

        <p>
            <strong>Top student:</strong>
            ${finalTopStudent.name}
            — ${getStudentAverage(finalTopStudent).toFixed(2)}
        </p>

        <h3>Final array</h3>

        ${finalResult
            .map(student => `
                <p>
                    ${student.id}.
                    ${student.name} —
                    Average: ${student.average.toFixed(2)} —
                    Passed: ${student.passed}
                </p>
            `)
            .join("")}

    </div>
`;