testaElementos = function (inputs) {

    let returnFalse = 0;
	let returnedEl = undefined;

    inputs.forEach( (element, index) => {

        el = $(`#${element.id}`);

        if(emptyInputTest(element.id)) {
            if(element.required) {
				returnFalse = 1;
				returnedEl = el;
                triggerMessage(element.message.required, element.id);
			}

        } else {
			if(element.customFunctions.length > 0) {
				element.customFunctions.forEach((customFunction, index) => {
					if(!customFunction(element.customFunctionsParameters[index])) {
						// console.log(element.message[index]);
						returnFalse = 1;
						returnedEl = el;
						triggerMessage(element.message.customFunctions[index], element.id);
						return false;
					}
				});
			}
        }

        if(returnFalse)
            return false;

	});
	
	console.log(returnFalse);

    if(returnFalse) {
		// console.log(returnedEl);
		return false;

	}
    
    return true;

}



emptyInputTest = function (id) {

    el = $(`#${id}`);

    if(el.attr("type") == "file") {
        if(document.getElementById(element.id).files.length == 0) {
            return true;
        }else
            return false;
    }else {
        if(el.val() == "") 
            return true;
        else
            return false;
    }
}


triggerMessage = function (msg, id) {
    Swal.fire({
        text: msg,
        type: 'error',
		confirmButtonText: 'Ok',
		onAfterClose: () => $(`#${id}`).focus()
	});

}