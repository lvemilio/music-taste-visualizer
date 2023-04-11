import styled from 'styled-components';

const Line = styled.hr`
  border: none;
  border-top: 2px solid #1DB954;
  margin: 20px 0;
`;


export const StyledLine = ({ text }) => {
    return (
        <div>
            <h1>{text}</h1>
        </div>
    );
}

