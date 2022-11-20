import styled from "@emotion/styled";
import {Button, Box, Link} from "@mui/material";

export const LoginImage = styled.img`
  height: 100%;
  width: 100%;
`;

export const WebTitle = styled.p`
  font-size: 25px;
  color: #1f1f1f;
  font-weight: bold;
`;

export const CustomButton = styled(Button)({
  background: "green",
  "&:hover": {
    backgroundColor: "#4CBB17",
  },
});

export const LeftSide = styled(Box)(({ bgimage, height, width }) => ({
  height: height || '100%',
  width: width || '100%',
  backgroundImage: `url(${bgimage})`,
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
}));

export const Logo = styled('img')({
  height: '50px',
  width: '100px'
})

export const LogoHolder = styled('div')({
  display: 'flex',
  alignItems: 'start',
  flexDirection: 'column'
})

export const SubHeading = styled('p')({
  color: '#666666',
  marginTop: 0,
})

export const FormAnimate = styled('div')({
  
})

export const ButtonAuthSwitch = styled('div')({
  display: 'flex',
  marginTop: '24px',
  gap: '10px',
  alignItems: 'center',
  color: '#666666',
})

export const AuthLink = styled(Link)({
  cursor: 'pointer',
})
