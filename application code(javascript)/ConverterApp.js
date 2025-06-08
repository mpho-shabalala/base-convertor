
/*******************************************************************************************************************************************************
 * @Author MG SHABALALA  
 * @date 18/07/2024
 * @class Abstract Data Type (ADT) Stack
 */
class Stack{
    _dataStore = [];
    _top = 0;

    /**
     * @description takes in user input as an element and push(store at the top) it to the underlying array (dataStore)
     * @param {*} element  - user input element any type (in js)
     */
    push(element){
        this._dataStore[this._top++] = element;
    }

    /**
     * @description return the last element and remove it from the stack
     * @returns top element in the stack
     */
    pop(){
        return this._dataStore[--this._top];
    }

    /**
     * @description returns the top element in the stack without manipulating the stack
     * @returns element in the top of the stack
     */
    peek(){
        return this._dataStore[this._top - 1]
    }

    /**
     * @description returns number of elements in the stack without manipulating the stack
     * @returns _top
     */
    length(){
        return this._top;
    }
    /**
     * clears the stack
     */
    clear(){
        this._top = 0;
    }
}

/*******************************************************************************************************************************************************
 * @author MG SHABALALA
 * @date 26/07/2024
 * @description Everything that has to do with dom manipulation and primitive operations on the UI is 
 * encapsulated in this class, and as such it creates an interface with a consistant layer
 * of abstraction
 * Private and public attributes are differentiated by this convention : _privateMethodStartsWithUnderscore(), publicMethodWithoutUnderscore()
 * PRIVATE METHODS (starts with underscore) ARE HIDDEN FROM THIS CLASSE'S PUBLIC INTERFACE AND SHOULDNT BE USED OUTSIDE THE CLASS
 */
class UI{

    /**
     * select element from ui using elementID and element type for verification of the selected element
     * @param {string} elementID 
     * @param {string} elementType element types include javascript identification name for htnl element { img instead of image, p instead of paragraph}, use proper identification names 
     * @returns html element  OR throws an error with this message:`ElementName specified does not exist in the UI`
     * if the selected element isn't valid according to this classe's standards
     */
    getDomElement(elementID, elementType){
        const element = document.getElementById(elementID);
        if(!this._isHTMLElementValid(element, elementType)){
            let longElementTypeName = '';
            if(elementType=='p') longElementTypeName = 'Paragraph'
            if(elementType=='img') longElementTypeName = 'Image'
            if(elementType=='form') longElementTypeName = 'Form'
            throw new Error(`${longElementTypeName} specified does not exist in the UI`);
        } 
        return element;
    }


    /**
     * get form's input value
     * @param {FormData} formData primitive FormData data structure
     * @param {string} inputName name that identifies the input box to get value from
     * @returns value within that input when form gets submitted
     */
    getFormInputValue(formData, inputName){
        if(formData.has(inputName)) {
            const inputValue =  formData.get(inputName);
            if(!this._isGreaterThanZero(inputValue)) throw new Error(`invalid input value with name ${inputName}, is less than zero`);
            return inputValue;
        }
        throw new Error(`No input specified with this name: ${inputName}`);
    }


    /**
     * takes a form DOM element and get format according to primitive FormData object
     * @param {form} form DOM/HTML form element
     * @returns instance of formData object
     */
      getFormData(form){ return new FormData(form)}


    // PRIVATE METHODS
     /**
     * checks if the element selected exists in the ui and checks if its type matches the one specified by elementType
     * @param {htmlElement} htmlElement element to be validated
     * @param {string} elementType type of element to match
     * @returns true or false
     */
    _isHTMLElementValid(htmlElement, elementType) {
        // console.log(htmlElement.nodeName.toLowerCase());
        return (htmlElement !== null) && 
               (htmlElement.nodeName.toLowerCase() === elementType );
    }


    /**
     * checks if number in the input box is greater than zero
     * @param {number} inputNumberValue 
     * @returns true or false
     */
    _isGreaterThanZero(inputNumberValue){
        return (inputNumberValue >= 0);
    }
}


/**
 * @author MG SHABALALA
 * @date 26/07/2024
 * @description this class uses mulbase function which contain an algorithm to convert numbers to a specified base
 * how the inputs are accessed and how outputs are displayed depends on the User Interface used,
 * there are routines which contains program for various user interfaces
 */
class ConverterApp{
    converterAppUI = new UI(); //composition
    //accessor property
    get converterAppUI(){ return this.converterAppUI; }

    /**
     * get inputs from form specified by the formID, and update the UI with reference to the other IDs
     * @param {string} formID id of the html form to be submitted
     * @param {string} outputReferenceID id html paragraph element for converted number
     * @param {string} numberErrorMessageID id of paragraph tag showing that error has occured on the input identified by name:number
     * @param {string} baseErrorMessageID id of paragraph tag showing that error has occured on the input identified by name:base
     * @param {string} copyIconID id of icon to copy converted number
     */
    getConverterAppFormInputs(
        formID, 
        outputReferenceID, 
        numberErrorMessageID, 
        baseErrorMessageID,
        copyIconID){
        try{
            //select form from UI
            const converterForm = this.converterAppUI.getDomElement(formID, 'form');
            //listen to form submition event
            converterForm.addEventListener('submit', submitEvent => {
                //prevent form submition's default behaviour
                submitEvent.preventDefault();
                //try and catch errors during form submition
                try{
                    //take user input number and base from UI
                    const converterFormData = this.converterAppUI.getFormData(converterForm);
                    const number = this.converterAppUI.getFormInputValue(converterFormData, 'number');
                    const base = this.converterAppUI.getFormInputValue(converterFormData, 'base');
                    //convert number to specified base
                    const convertedNumber = this.mulbase(number, base);
                    //update the UI with converted number
                    this.convertedNumberUIUpdate(outputReferenceID, convertedNumber);
                    // copy number from UI
                    this.copyNumberFromUI(copyIconID, convertedNumber)
                }catch(err){
                    //catch error on number input and display in the UI
                    if(this.errorMessageInclude(err,'number')) {
                        this.inputErrorUIUpdate(err, numberErrorMessageID);
                    }
                    //catch error on base input and display in the UI
                    else if(this.errorMessageInclude(err,'base')) {
                        this.inputErrorUIUpdate(err, baseErrorMessageID);
                    }
                    else {
                        //log/send error to error reporting system
                        console.error(err);
                    }
                }
            });
        }catch(err){
             //log/send error to error reporting system
            console.error(err)
        }
    }

    /**
     * checks if error message specified includes a given string : item
     * @param {object} err error object thrown by s specific part of the application code
     * @param {string} item to check if it exists in the error message
     * @returns true or false
     */
    errorMessageInclude(err,item){
        return err.message.includes(item);
    }

    /**
     * copy converted number from ui when element specified by copyIconID is clicked
     * @param {string} copyIconID 
     * @param {string} converedNumber 
     */
    copyNumberFromUI(copyIconID, convertedNumber){
        try{
            const copyIcon = this.converterAppUI.getDomElement(copyIconID, 'img');
            copyIcon.addEventListener('click', clickEvent => {
                clickEvent.preventDefault();
                try{
                    console.log(convertedNumber);
                }catch(err){
                    console.error(err);
                }
            })
        }catch(err){
            console.error(err);
        }

    }

    /**
     * @description generic algorithm which uses stack to perform recursive operation : convert number to specified base
     * @param {number} number 
     * @param {number} base 
     * @returns converted number
     */
    mulbase(number, base){
        let stack = new Stack();  //aggregation
        const INITIAL_STACK_SIZE = stack.length();
        const MINIMUM_NUMBER = 0;
        do{
            //compute remainder of number devided by base
            const remainder = number % base;
            // push remainder into the stack
            stack.push(remainder);
            //divide number by base
            number = Math.floor(number /= base);
        }while(number > MINIMUM_NUMBER);
        let convertedNumber = '';
        //pop stack eements as long as stack length is greated than 0
        while(stack.length() > INITIAL_STACK_SIZE){
            convertedNumber += stack.pop();
        }
        //return converted number
        return convertedNumber;
    }

    /**
     * get converter app form using the fomrID
     * @param {string} formID 
     * @returns html form 
     */
    getConverterForm(formID){
        return this.converterAppUI.getDomElement(formID, 'form');
    }

    /**
     * Update UI with the paragraph text of converted number
     * @param {string} outputReferenceID 
     * @param {string} paragraphtext 
     */
    convertedNumberUIUpdate(outputReferenceID, paragraphtext){
        const paragraph = this.converterAppUI.getDomElement(outputReferenceID, 'p');
        paragraph.textContent = paragraphtext;
    }

    /**
     * update UI with error message from the error object parameter
     * @param {object} error 
     * @param {string} errParagraphID indicates where the error has to be displayed in relation to where it has occured
     */
    inputErrorUIUpdate(error, errParagraphID){
        const errorMessage = this.converterAppUI.getDomElement(errParagraphID, 'p');
        errorMessage.textContent = error.message.replace(errParagraphID, 'Player');
        const TIMEOUT = 3000;
        // clear error message after TIMEOUT
        setTimeout(() => {
            errorMessage.textContent = '';
        }, TIMEOUT);
    }

}


const converterApp = new ConverterApp();
// for WEB user interface (HTML)
converterApp.getConverterAppFormInputs( 'converter-app-form', 
    'conerted-value',
    'number-error-message',
    'base-error-message',
    'copy');

