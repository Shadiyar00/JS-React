
function createTask(name) {

    let count = 0;

    return {

        getName: function () {
            return name;
        },

        getCount: function () {
            return count;
        },

        reset: function () {
            count = 0;
        },

        run: function () {

            count++;

            const startTime = Date.now();

            return new Promise(function (resolve, reject) {

               
                const loadingTime =
                    Math.floor(Math.random() * 1501) + 500;

                setTimeout(function () {

                    const endTime = Date.now();

                    const time = endTime - startTime;

                    const success = Math.random() > 0.3;

                    if (success) {

                        resolve({
                            name: name,
                            status: "Completed",
                            time: time
                        });

                    } else {

                        reject({
                            name: name,
                            status: "Failed",
                            time: time
                        });

                    }

                }, loadingTime);

            });
        }
    };
}



const task1 = createTask("Load Users");
const task2 = createTask("Load Posts");
const task3 = createTask("Load Comments");

const tasks = [
    task1,
    task2,
    task3
];



const tasksContainer = document.getElementById("tasks");

function displayTasks() {

    tasksContainer.innerHTML = "";

    tasks.forEach(function (task) {

        const div = document.createElement("div");

        div.className = "task";

        div.innerHTML = `
            <div class="task-info">
                <strong>${task.getName()}</strong>
                <span>
                    Execution count: ${task.getCount()}
                </span>
            </div>

            <span class="status">
                Ready
            </span>
        `;

        tasksContainer.appendChild(div);

    });
}

displayTasks();




async function runOneTask(task, element) {

    const status = element.querySelector(".status");

    status.textContent = "Loading...";
    status.className = "status";

    try {

        const result = await task.run();

        status.textContent =
            `${result.status} (${result.time} ms)`;

        status.classList.add("success");

        return result;

    } catch (error) {

        status.textContent =
            `${error.status} (${error.time} ms)`;

        status.classList.add("error");

        return error;
    }
}



function getTaskElements() {

    return document.querySelectorAll(".task");

}


async function runAllTasks() {

    const startTime = Date.now();

    const elements = getTaskElements();

    elements.forEach(function (element) {

        const status = element.querySelector(".status");

        status.textContent = "Loading...";
        status.className = "status";

    });

    const promises = tasks.map(function (task) {

        return task.run()
            .then(function (result) {

                return result;

            })
            .catch(function (error) {

                return error;

            });

    });

    const results = await Promise.all(promises);

    const endTime = Date.now();

    const totalTime = endTime - startTime;

    results.forEach(function (result, index) {

        const status =
            elements[index].querySelector(".status");

        status.textContent =
            `${result.status} (${result.time} ms)`;

        if (result.status === "Completed") {
            status.classList.add("success");
        } else {
            status.classList.add("error");
        }

    });

    document.getElementById("result").innerHTML =
        `<p>All tasks finished.</p>
         <p>Total concurrent time: ${totalTime} ms</p>`;

    displayTasks();
}



async function runSequential() {

    const startTime = Date.now();

    const results = [];

    for (const task of tasks) {

        try {

            const result = await task.run();

            results.push(result);

        } catch (error) {

            results.push(error);

        }

    }

    const endTime = Date.now();

    const totalTime = endTime - startTime;

    document.getElementById("timeResult").textContent =
        `Sequential execution: ${totalTime} ms`;

    document.getElementById("result").innerHTML =
        `<p>Sequential execution finished.</p>
         <p>Total time: ${totalTime} ms</p>`;

    displayTasks();
}



async function runConcurrent() {

    const startTime = Date.now();

    const promises = tasks.map(function (task) {

        return task.run()
            .catch(function (error) {

                return error;

            });

    });

    const results = await Promise.all(promises);

    const endTime = Date.now();

    const totalTime = endTime - startTime;

    document.getElementById("timeResult").textContent =
        `Concurrent execution: ${totalTime} ms`;

    document.getElementById("result").innerHTML =
        `<p>Concurrent execution finished.</p>
         <p>Total time: ${totalTime} ms</p>`;

    displayTasks();
}

document
    .getElementById("runAllBtn")
    .addEventListener("click", runAllTasks);

document
    .getElementById("sequentialBtn")
    .addEventListener("click", runSequential);

document
    .getElementById("concurrentBtn")
    .addEventListener("click", runConcurrent);



async function eventLoopDemo(log) {

    log("Async function");

    await Promise.resolve();

    log("Async await");
}


function runEventLoopDemo() {

    const output =
        document.getElementById("consoleOutput");

    output.textContent = "";

    function log(message) {

        console.log(message);

        output.textContent +=
            message + "\n";
    }


    log("Start");

    setTimeout(function () {

        log("Timer 1");

    }, 0);


    Promise.resolve().then(function () {

        log("Promise 1");

    });


    eventLoopDemo(log);


    setTimeout(function () {

        log("Timer 2");

    }, 0);


    Promise.resolve().then(function () {

        log("Promise 2");

    });


    log("End");
}


document
    .getElementById("eventLoopBtn")
    .addEventListener("click", runEventLoopDemo);