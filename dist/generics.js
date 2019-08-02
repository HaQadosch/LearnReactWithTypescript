function getData(url) {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}
getData('/person/1').then(person => console.log({ person }));
//# sourceMappingURL=generics.js.map