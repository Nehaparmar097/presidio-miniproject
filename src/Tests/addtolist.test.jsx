import React from "react"
import {render, screen} from "@testing-library/react"
import { AddToList } from "../Components/AddToList"


describe('addtolist commonent ',()=>{
    test('cheking te render',()=>{
        render(<AddToList/>)
    });


test('displays the correct text', () => {
    render(<AddToList />);
    const linkElement = screen.getByText(/Add To List \+/i);
    expect(linkElement).toBeInTheDocument();
  });

});