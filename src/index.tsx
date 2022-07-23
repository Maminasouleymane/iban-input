import 'react-app-polyfill/ie11';

import * as ReactDOM from 'react-dom';

import React, { useEffect, useState } from 'react'

export interface IbanProps{
    ibanFormat: string;
    value?: string;
    onChange?: (e: string) => void;
    onBlur?: (e: string) => void;
    onPaste?: (e: string) => void;
}

const IbanInput = (props: IbanProps) => {
    const { value = '', ibanFormat, onChange, onBlur, onPaste, ...rest } = props;
    const [ibanVal, setIbanVal] = useState<string>('');
    const [blur, setBlur] = useState<boolean>(false);

    // the country code 
    const prefix = ibanFormat.substring(0, 2);
    

    const separator = (expression: string) => {
        
        // we check at first if the iban format contains a separator
        if(/^[a-zA-Z]+$/.test(expression)) return "";

        // we identify the special character that should separate every block of numbers  
        const theSeparator = expression.replace(/[A-Za-z]/g, '');

        // we make sure at first if the separator is only one special character 
        const areTheSame = theSeparator.split('').every(char => char === theSeparator[0])
        if(theSeparator.length > 1 && !areTheSame){
            alert("your ibanFormat is not valid, please double check your ibanFormat, and/or check the docs for more details")
            return;
        }
        
        // we check if the separator is a space
        if (theSeparator === ' '){
            console.log('yes its a space')
            return " "
        }

        // finally if none of the above checks is true, we return the separator
        return theSeparator[0]
    };

    // we search for the positions of each separator if they exist and we store them 
    // to add them later when the user is typing his iban code without the need of him 
    // entering this separators
    const locateSeparatorsPositions = (ibanInput: string): any => {
        const indexes: number[] = [];

        ibanInput.split('').forEach((character, index) => {
            if (character === separator(ibanFormat)) {
                indexes.push(index);
            }
        });
        return indexes.map((element, index) => element - index);
    };


    const formatValue = (inputValue: string, paste?: boolean) => {
        let content = inputValue;
        content = content.toUpperCase().replace(/[\W_]+/g, '');

        if (content.substring(0, 2) === prefix) {
            content = content.substring(2);
        }

        if (content.length + 2 > ibanFormat.replace(/-/g, '').length) {
            content = content.slice(0, -(content.length - ibanFormat.replace(/-/g, '').length + 2));
        }
        const val = formatInput(content);
        setIbanVal(val);
        paste && onPaste?.(prefix + val.replace(/-/g, ''));
    };

    // here we format the input 
    const formatInput = (input: string) => {
        const separatorPositions = locateSeparatorsPositions(ibanFormat.replace(prefix, ''));

        input = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
        input = input
            .split('')
            .map((currentCharacter, index) => {
                if (separatorPositions.includes(index)) {
                    return separator(ibanFormat) + `${currentCharacter}`;
                }
                return currentCharacter;
            })
            .join('');
        return input;
    };

    const handleChange = (eventValue: React.ChangeEvent<HTMLInputElement>) => {
        const val = formatInput(eventValue.target.value);
        setIbanVal(val);
        const eventValueWithPrefix = eventValue ? prefix + eventValue.target.value.replace(/-/g, '') : '';
        onChange?.(eventValueWithPrefix);
    };

    const handleBlur = () => {
        onBlur?.(prefix + ibanVal.replace(/-/g, ''));
    };

    // when the user paste his iban code 
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        let pasteContent = e.clipboardData.getData('text');
        formatValue(pasteContent, true);
    };

    useEffect(() => {
        value && formatValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div className={`textfield__input ${blur && "textfield__input--focused"}`}>
            <div className="textfield__input-adornment">
                <span className="textfield__adornment-text">{prefix}</span>
            </div>
            <input
                className="textfield__input-field"
                placeholder="Some placeholder text"
                maxLength={ibanFormat.length - 2}
                value={ibanVal}
                onPaste={handlePaste}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={() => setBlur(!blur)}
            />
        </div>
    )
};

export default IbanInput;
