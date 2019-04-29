
class InputTester {

    constructor (inputData, inputFileMessage, inputMessage) {
        this.inputData = inputData;
        this.inputFileMessage = inputFileMessage;
        this.inputMessage = inputMessage;
    }

    static testElement (input = this.inputData,  inputMessage = this.inputMessage, inputFileMessage = this.inputFileMessage) {


        return new Promise((resolve, reject) => {

            let returnFalse = false;
            let element = document.getElementById(input.id);

            if(this.emptyInputTest(input.id)) {
                if(input.required) {
                    returnFalse = true;
                    let singleInputElementName = (element.getAttribute("data-name")) ? (element.getAttribute("data-name")) : (element.getAttribute("name"));

                    if(element.getAttribute("type") == "file")
                        triggerMessage(inputFileMessage.replace("<inputmessage>", singleInputElementName), input.id);
                    else
                        triggerMessage(inputMessage.replace("<inputmessage>", singleInputElementName), input.id);
                }

            } else {
                if(Object.entries(input.checkFunctions).length > 0) {
                    Object.entries(input.checkFunctions).forEach(([index, checkFunction]) => {
                        if(!checkFunction(input.checkFunctionsParameters[index])) {
                            returnFalse = true;
                            triggerMessage(input.message[index], input.id);
                            return false;
                        }
                    });
                }
            }

            if(returnFalse) {
                resolve(false);

            }
            
            resolve(true);

        });
    }



    static testElements (inputs = this.inputData) {

        return new Promise((resolve, reject) => {

            let returnFalse = false;
        
            inputs.forEach( (element, index) => {
                
                if(Object.entries(element.checkFunctions).length > 0) {
                    Object.entries(element.checkFunctions).forEach(([index, checkFunction]) => {
                            if(!checkFunction(element.checkFunctionsParameters[index])) {
                                returnFalse = true;
                                triggerMessage(element.message[index], element.id);
                                return false;
                            }
                        });
                    }

                if(returnFalse)
                    return false;
        
            });
            
        
            if(returnFalse) {
                resolve(false);
            }
            
            resolve(true);

        })
    
    }

    static checkRequiredElements(formID, inputMessage = this.inputMessage, inputFileMessage = this.inputFileMessage) {
        return new Promise((resolve, reject) => {

                
            let returnFalse = false;
            let form = document.getElementById(formID);
            let formInputs = Array.from(form.getElementsByTagName("input"));


            formInputs = formInputs.filter((element) => {
                    if(element.hasAttribute("required")) 
                        return element;
                });


            let singleInputElementName = "";
            let elementID = "";


            formInputs.forEach(element => {

                elementID = element.getAttribute("id");

                if(this.emptyInputTest(elementID)) {
                    singleInputElementName = (element.getAttribute("data-name")) ? (element.getAttribute("data-name")) : (element.getAttribute("name"));

                    if(element.getAttribute("type") == "file") {
                        triggerMessage(inputFileMessage.replace("<inputmessage>", singleInputElementName), elementID);
                        resolve(false);
                    }
                    else {
                        triggerMessage(inputMessage.replace("<inputmessage>", singleInputElementName), elementID);
                        resolve(false);
                    }
                }


            });
            
            
            resolve(true);

        });


    }

    static emptyInputTest(id) {

        let el = document.getElementById(id);
    
        if(el.getAttribute("type") == "file") {
            if(document.getElementById(element.id).files.length == 0) {
                return true;
            }else
                return false;
        }else {
            if(el.value == "") 
                return true;
            else
                return false;
        }
    }


    static triggerMessage(msg, id) {
        Swal.fire({
            text: msg,
            type: 'error',
            confirmButtonText: 'Ok',
            onAfterClose: () => document.getElementById(id).focus()
        });
    
    }



}