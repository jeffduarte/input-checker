# input-checker
JS Library to check form inputs with ease.



Example: 



items = [

            {
                id: "data_nascimento",
                required: true,
                checkFunctions: {"checaIdadeElemento" : checaIdadeElemento},
                checkFunctionsParameters: {"checaIdadeElemento" : ["data_nascimento"]},
                message: {"checaIdadeElemento" : "A idade deve estar entre 16 e 29 anos."}
            }			
];


InputTester.checkRequiredElements("formulario2", `O campo <inputmessage> é obrigatório`, `<inputmessage> é de envio obrigatório`).then((retorno) => {if(retorno)InputTester.testElements(items)});