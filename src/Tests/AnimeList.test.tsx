// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import { AnimeList } from '../Components/AnimeList';

// describe('AnimeList Component', () => {
//   const mockSetAnimeInfo = jest.fn();
//   const mockHandleList = jest.fn();
//   const mockAnimeComponent = () => <div>Add to List</div>;

//   const animeData = [
//     {
//       title: 'Attack on Titan',
//       title_japanese: '進撃の巨人',
//       synopsis: 'Humanity’s fight against Titans.',
//       images: {
//         jpg: {
//           large_image_url: 'https://example.com/image.jpg'
//         }
//       }
//     }
//   ];

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders anime list correctly', () => {
//     const { getByText, getByAltText } = render(
//       <AnimeList 
//         animelist={animeData} 
//         setAnimeInfo={mockSetAnimeInfo} 
//         animeComponent={mockAnimeComponent} 
//         handleList={mockHandleList} 
//       />
//     );

//     expect(getByText('Attack on Titan')).toBeInTheDocument();
//     expect(getByAltText('animeImage')).toHaveAttribute('src', 'https://example.com/image.jpg');
//   });

//   test('calls setAnimeInfo on anime card click', () => {
//     const { getByText } = render(
//       <AnimeList 
//         animelist={animeData} 
//         setAnimeInfo={mockSetAnimeInfo} 
//         animeComponent={mockAnimeComponent} 
//         handleList={mockHandleList} 
//       />
//     );

//     fireEvent.click(getByText('Attack on Titan'));
//     expect(mockSetAnimeInfo).toHaveBeenCalledWith(animeData[0]);
//   });

//   test('calls handleList on overlay click', () => {
//     const { getByText } = render(
//       <AnimeList 
//         animelist={animeData} 
//         setAnimeInfo={mockSetAnimeInfo} 
//         animeComponent={mockAnimeComponent} 
//         handleList={mockHandleList} 
//       />
//     );

//     fireEvent.click(getByText('Attack on Titan').closest('.overlay'));
//     expect(mockHandleList).toHaveBeenCalledWith(animeData[0]);
//   });

//   test('displays "Not Found" when animelist is empty', () => {
//     const { getByText } = render(
//       <AnimeList 
//         animelist={[]} 
//         setAnimeInfo={mockSetAnimeInfo} 
//         animeComponent={mockAnimeComponent} 
//         handleList={mockHandleList} 
//       />
//     );

//     expect(getByText('Not Found')).toBeInTheDocument();
//   });
// });
