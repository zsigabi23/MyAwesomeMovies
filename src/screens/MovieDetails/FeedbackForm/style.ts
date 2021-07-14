import styled from "styled-components";

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 16px;
`;

export const Field = styled.input<{error: boolean}>`
    ${({theme, error}) => `
        display: block;
        padding: 8px;
        margin-bottom: 8px;
        border-radius: 4px;
        appearance: none;
        border: 1px solid ${error ? 'red' : 'grey'};
        width: 100%;

        @media screen and (min-width: ${theme.widths['4xl']}) {
            width: 70%;
        }
    `}
`;

export const Button = styled.button`
    ${({theme}) => `
        display: block;
        padding: 8px;
        border-radius: 4px;
        appearance: none;
        background: ${theme.palette.green};
        width: 100%;
        border: none;

        @media screen and (min-width: ${theme.widths['4xl']}) {
            width: 70%;
        }
    `}
`;