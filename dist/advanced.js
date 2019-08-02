let notes = 'DropDown';
function initialiseValue(field) {
    switch (field.control) {
        case 'TextBox':
            field.value = '';
            break;
        case 'DatePicker':
            field.value = new Date();
            break;
        case 'NumberSlider':
            field.value = 0;
            break;
        case 'CheckBox':
            field.value = false;
            break;
        default:
            const nope = field;
    }
    return field;
}
//# sourceMappingURL=advanced.js.map