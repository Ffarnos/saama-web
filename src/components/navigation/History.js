

const historySave = (newLink) => {
    let history = localStorage.getItem("history");

    if (!history) history = [];
    else history = JSON.parse(history);

    history.push(newLink);
    localStorage.setItem("history", JSON.stringify(history));
}

export default historySave;