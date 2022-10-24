/**
 * NOTE: Should Create an Instance of RegExp when using APP_REGEX
 */
export const APP_REGEX = {
    // Text-area
    NEW_LINE: /\r\n|\r|\n/g,
    END_OF_LINE: /\r\n/g,
    LINE_FEED: /\n/g,
    CARRIAGE_RETURN: /[\r]/g,
    NEW_LINE_AND_SPACE: /\r\n|\r|\n/g,
    // HTML Editor
    HTML_TAGS: /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/ig,
    HTML_BR_TAG_ONLY: /<br.*?>/g,
    // URL
    URL_PROTOCOL_INCLUDES: /(?:(?:https|http):\/\/)/,
    URL_PROTOCOL_START_WITH: /^(?:(?:https|http):\/\/)/,
    URL_HTTPS_AND_HTTP_VALIDATION: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,63}(:[0-9]{1,5})?(\/.*)?\s*$/,
    URL_HTTPS_ONLY_VALIDATION: /^(https:\/\/www\.|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,63}(:[0-9]{1,5})?(\/.*)?\s*$/,
    // Email
    EMAIL_DOMAIN_REGEX: '(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]',
    EMAIL_SUBDOMAIN_REGEX: '^[a-zA-Z]+[a-zA-Z0-9\-]*$'
}

export class RegexObject {
    public static checkOnlyNumbers(value): boolean {
        return new RegExp('^[0-9]*$').test(value);
    }

    public static checkOnlyLettersAndSymbols(value): boolean {
        return new RegExp('^[a-zA-Z\\/~`!@#$%^&+={}\\-\\[\\]*_)(|:;,.\'?<>]*$').test(value);
    }

    public static checkEmailIsValid(email: string): boolean {
        const regexCheckEmail = /^[\d\w._-]+@([\d\w._-]+\.)+[\w]+$/i;
        return regexCheckEmail.test(email);
    }

    public static checkOnlyPhoneNumber(phoneNumberKey: string): boolean {
        return new RegExp('^[+]*[(]*[)]*[-]*[ ]*[.]*[0-9]*$').test(phoneNumberKey);
    }

    public static isE164Format(phoneNumber: string): boolean {
        return new RegExp('^\\+[1-9]\\d{1,14}$').test(phoneNumber);
    }

    // check the input is a string of special character.
    public static checkOnlySpecialCharacters(name: string): boolean {
        return new RegExp('^[*-.#_@]*$').test(name);
    }

    public static checkOnlyNumbersAndCharacters(name: string): boolean {
        return new RegExp('^[a-zA-Z0-9]+$').test(name);
    }

    public static checkOnlyNumbersAndCharactersAndWhiteSpace(name: string): boolean {
        return new RegExp('^[a-zA-Z0-9 ]+$').test(name);
    }

    // Only Numbers And Characters And Asterisk. 10 symbols.
    public static verifySearchPattern(name: string): boolean {
        return new RegExp('[a-zA-Z0-9*]{10}$').test(name);
    }

    public static checkExistSpecialCharacters(value: string): boolean {
        return new RegExp('^[a-zA-Z0-9-.#_@/\+!%^&$,;:]+$').test(value);
    }

    public static checkPhoneNumberUSA(number: string): boolean {
        return new RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{4}$').test(number);
    }

    public static checkFormatedPhoneNumber(number: string): boolean {
        return new RegExp('^[0-9]{10}$').test(number) || new RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{4}$').test(number);
    }

    public static checkFormatCard(number: string): boolean {
        return new RegExp(
            '^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$')
            // '^[0-9]+$')
            .test(number);
    }

    public static checkFormatVisaCard(number: string): boolean {
        return new RegExp(
            '^4[0-9]{12}(?:[0-9]{3})?$')
            .test(number);
    }

    public static checkFormatMasterCard(number: string): boolean {
        return new RegExp(
            '^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$')
            .test(number);
    }

    public static checkFormatAmexCard(number: string): boolean {
        return new RegExp(
            '^3[47][0-9]{13}$')
            .test(number);
    }

    public static checkDuplicateFormat(number: string): boolean {
        return new RegExp(
            '[-,]{2,}')
            .test(number);
    }

    public static checkFormatJCBCard(number: string): boolean {
        return new RegExp(
            '^(?:2131|1800|35\\d{3})\\d{11}$')
            .test(number);
    }

    public static CheckFormatDiscoverCard(number: string): boolean {
        return new RegExp(
            '^6(?:011|5[0-9]{2})[0-9]{12}$')
            .test(number);
    }

    public static checkFormatDinerClubCard(number: string): boolean {
        return new RegExp(
            '^3(?:0[0-5]|[68][0-9])[0-9]{11}$')
            .test(number);
    }

    public static checkCardIsNumber(number: string): boolean {
        return new RegExp(
            '[^a-zA-Z-,]$')
            .test(number);
    }

    public static extractBase64Image(value: string): string[] {
        if (!value) {
            return null;
        }

        const base64Strings = value.match(/data:image\/([a-zA-Z]*);base64,([^\"]*)/g);

        if (base64Strings == null) {
            return [];
        }

        const arr = [];
        base64Strings.forEach(v => {
            arr.push(v);
        });

        return arr;
    }

    public static replaceBase64ToCid(targetValue: string, replacedValue: string, newValue: string): string {
        return targetValue.replace(replacedValue, newValue);
    }

    public static extractFileExtention(value) {
        return /(?:\.([^.]+))?$/.exec(value)[0];
    }

    static getInlineImageUrls(value: string): string[] {
        if (!value) {
            return [];
        }
        const srcStrings = value.match(/src=\"https\:([\w\-\.\/]{1,})([\w\-]{1,})(\.\w{3,4})\"/g);

        if (srcStrings == null) {
            return [];
        }

        const arr = [];

        srcStrings.forEach(v => {
            const url = v.match(/https\:([\w\-\.\/]{1,})([\w\-]{1,})(\.\w{3,4})/g);
            if (url != null) {
                arr.push(url[0]);
            }
        });

        return arr;
    }

    public static isUrlValid(value: string, httpsOnly: boolean = true): boolean {
        return httpsOnly
            ? new RegExp(APP_REGEX.URL_HTTPS_ONLY_VALIDATION).test(value)
            : new RegExp(APP_REGEX.URL_HTTPS_AND_HTTP_VALIDATION).test(value);
    }

    public static isDomainEmailValid(value: string): boolean {
        return new RegExp(APP_REGEX.EMAIL_DOMAIN_REGEX).test(value);
    }

    public static isSubDomainEmailValid(value: string): boolean {
        return new RegExp(APP_REGEX.EMAIL_SUBDOMAIN_REGEX).test(value);
    }
}
