import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { app } from '../../../gatsby-browser';
import styled from 'styled-components';
import ResponsiveText from '../apis/ResponsiveText';
import ResponsiveImage from '../apis/ResponsiveImage';
import Logo from '../../images/icon.png';
import {Horizontal} from "../apis/flexbox-containers";
import google from '../../images/google-logo.svg';
import facebook from '../../images/facebook-logo.svg';
const LoginFirebase = () => {
    const auth = getAuth(app);
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
        }
    };

    const handleFacebookLogin = async () => {
        const provider = new FacebookAuthProvider();

        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
        }
    };

    document.body.style.overflow = 'hidden';

    return (
        <Container>
            <CardWrapper>
                <div>
                    <ResponsiveText color={'#4b4a4a'} scale={0.9}>
                        Terapia GENESÍS
                    </ResponsiveText>
                    <ContainerCenter>
                        <ResponsiveImage src={Logo} scale={2.4} />
                    </ContainerCenter>
                    <OthersContainer>
                        <GoogleFacebookButtonsContainer>
                            <SignInWithGoogle onClick={handleGoogleLogin}/>
                            <SignInWithFacebook onClick={handleFacebookLogin}/>
                        </GoogleFacebookButtonsContainer>
                    </OthersContainer>
                </div>
            </CardWrapper>
        </Container>
    );
};

const SignInWithGoogle = ({onClick}) => <StyledSignInWithGoogle
    center
    centerH
    gap={20}
    onClick={onClick}>
    <ResponsiveImage src={google} scale={0.6}/>
    <SignInText scale={0.38} color={'#2f2f2f'} bold>
        Continuar con Google
    </SignInText>
</StyledSignInWithGoogle>;

const StyledSignInWithGoogle = styled(Horizontal)`
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  background: white;
  border-radius: 25px;
  padding: 10px 15px;
  margin: 10px auto 10px;
  border: 1px solid #cccccc;
  width: 82%;
`;

const SignInWithFacebook = ({onClick}) => <StyledSignInFacebook
    center
    centerH
    gap={20}
    onClick={onClick}>
    <ResponsiveImage src={facebook} scale={0.8}/>
    <SignInText scale={0.36} color={'#ffffff'} bold>
        Continuar con Facebook
    </SignInText>
</StyledSignInFacebook>;

const StyledSignInFacebook = styled(Horizontal)`
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  background: #405996;
  border-radius: 25px;
  padding: 8px 15px;
  width: 84%;
`;

const SignInText = styled(ResponsiveText)`
  font-family: sans-serif;
`;


const GoogleFacebookButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;


const OthersContainer = styled.div`
  width: 100%; 
  margin: 0 auto;
`;

const ContainerCenter = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const ErrorText = styled(ResponsiveText)`
    margin-top: 20px;
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
const CardWrapper = styled.div`

  @media (min-width: 545px) {
    width: 70%;
    height: 75%;
    max-width: 400px;
    max-height: 600px;
    min-height: 300px;
    min-width: 200px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
`;
export default LoginFirebase;