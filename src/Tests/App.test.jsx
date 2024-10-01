import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import App from "../App"; // Adjust the path as necessary

describe('AddToList functionality', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('should add anime to myAnimeList when not present', () => {
    const example = { mal_id: 1, name: 'Naruto', genres: [] };

    // Find and click the "Add To List +" button
    const addButton = screen.getByText(/Add To List \+/i);
    fireEvent.click(addButton);

    // Verify that the anime was added
    expect(screen.getByText(/Naruto/i)).toBeInTheDocument();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test('should not add anime if already present', () => {
    const example = { mal_id: 1, name: 'Naruto', genres: [] };

    // Click the add button twice
    const addButton = screen.getByText(/Add To List \+/i);
    fireEvent.click(addButton); // First click
    fireEvent.click(addButton); // Second click

    // Verify that Naruto is still present only once
    expect(screen.getAllByText(/Naruto/i).length).toBe(1);
  });
});
