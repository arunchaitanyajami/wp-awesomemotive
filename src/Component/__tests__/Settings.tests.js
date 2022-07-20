import React from "react";
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings from "../Settings";

let props = {
    setValue: jest.fn(),
    human_date: false,
    num_rows: 5,
    emails: [
        'test@test.com'
    ],
    setDate: jest.fn(),
    setEmails: jest.fn(),
}

jest.mock('@wordpress/data', () => ({
    useSelect: jest.fn(() => ({
        getSettings: jest.fn().mockReturnValue({
            data: jest.fn().mockReturnValue({
                emails: [
                    'test@test.com'
                ],
                num_rows: 5,
                human_date: false
            })
        })
    })),
    withSelect: jest.fn(),
    combineReducers: jest.fn(),
    createReduxStore: jest.fn(),
    register: jest.fn(),
}));

describe('Settings Component', () => {
    let useEffect
    let useState
    beforeEach(() => {
        useEffect = jest.spyOn(React, 'useEffect')
        useState = jest.spyOn(React, 'useState')
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f())
    }

    it('Should Render the default component', async () => {
        mockUseEffect()
        mockUseEffect()
        useState.mockReturnValueOnce([props.num_rows, jest.fn()]).mockReturnValueOnce([props.human_date, jest.fn()]).mockReturnValueOnce([props.emails, jest.fn()])
        const {container} = render(<Settings/>)

        expect(parseInt(container.querySelector('#awesomemotive-settings-form-input-no-of-rows').value)).toBe(5)
        expect(container.querySelector('#email_1').value).toBe(props.emails[0])
        expect(container.querySelector('.components-form-toggle__input')).toBeVisible()
        expect(container).toMatchSnapshot()
    })

    it('Should add multiple emails and check if node exists', async () => {
        props.emails = props.emails.concat([
            'test2@test.com',
            'test3@test.com',
            'test4@test.com'
        ]);

        mockUseEffect()
        mockUseEffect()
        useState.mockReturnValueOnce([props.num_rows, jest.fn()]).mockReturnValueOnce([props.human_date, jest.fn()]).mockReturnValueOnce([props.emails, jest.fn()])
        const {container} = render(<Settings/>)

        expect(container.querySelector('#email_1').value).toBe(props.emails[0])
        expect(container.querySelector('#email_3').value).toBe(props.emails[2])

        expect(container).toMatchSnapshot()

    })

})
