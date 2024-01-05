import { render,screen } from "@testing-library/react";
import { Button } from ".";
import userEvent from "@testing-library/user-event";

describe('<Button />', () =>{

    it('should render the button with the text "Carregar mais posts"', () => {
        render(<Button text="Carregar mais posts"/>);
        
        expect.assertions(1);
        const button = screen.getByRole('button', {name: /carregar mais posts/i});
        expect(button).toBeInTheDocument();
    });

    it('should call function on button click', () => {
        const fn = jest.fn();
        render(<Button text="Carregar mais posts" onClick={fn}/>);
        
        const button = screen.getByRole('button', {name: /carregar mais posts/i});

        userEvent.click(button);

        expect(fn).toHaveBeenCalledTimes(1);

    });

    it('should be disabled when disableb is true', () => {

        render(<Button text="Carregar mais posts" disabled={true}/>);
        
        const button = screen.getByRole('button', {name: /carregar mais posts/i});

        expect(button).toBeDisabled();

    });

    it('should be enable when disableb is false', () => {
        const fn = jest.fn();
        render(<Button text="Carregar mais posts" disabled={false} onClick={fn}/>);
    
        const button = screen.getByRole('button', {name: /carregar mais posts/i});
        expect(button).toBeEnabled();

    });

    it('should match snapshot', () => {
        const fn = jest.fn();
        const {container} = render(<Button text="Carregar mais posts" disabled={false} onClick={fn}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
});