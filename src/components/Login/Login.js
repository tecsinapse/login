import React, { useState } from 'react';
import {
  Paper,
  useMediaQuery,
  Divider,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import clsx from 'clsx';
import { Button } from '@tecsinapse/ui-kit';
import { defaultGreyLight3 } from '@tecsinapse/ui-kit/build/utils/colors';
import { renderStyledColor } from '@tecsinapse/ui-kit/build/ThemeProvider';
import PoweredBy from './PoweredBy';

const useStyle = makeStyles(({ spacing }) => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  rootmobile: {
    backgroundImage: ({ backgroundImage }) =>
      backgroundImage && `url(${backgroundImage})`,
    display: 'flex',
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    left: '0',
    top: '0',
  },
  imgHeader: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexBasis: '250px',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '5%',
  },
  contentMobile: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footerImage: {
    display: 'inline-block',
    maxHeight: '100%',
    maxWidth: '100%',
    textAlign: 'center',
  },
  footer: {
    borderTop: `solid 1px rgba(0, 0, 0, 0.12)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: defaultGreyLight3,
  },
  footermobile: {
    backgroundColor: '#fff',
  },
  strechSelf: {
    alignSelf: 'stretch',
  },
  logo: {
    height: 'auto',
    maxWidth: '100%',
  },
  logoContainer: {
    display: 'block',
    textAlign: 'center',
    marginLeft: spacing(0.5),
    marginRight: spacing(0.5),
  },
  footerImg: {
    width: '20%',
  },
  inputData: {
    alignSelf: 'stretch',
    marginTop: spacing(1),
  },
  extra: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: ({ rememberBox }) =>
      rememberBox ? 'space-between' : 'flex-end',
    marginTop: spacing(1),
    marginBottom: ({ showButton }) => (showButton ? spacing(0) : spacing(2)),
  },
  extramobile: {
    flexDirection: 'column',
  },
  submit: {
    marginTop: spacing(2),
    marginBottom: spacing(2),
    display: ({ showButton }) => (showButton ? 'inline-flex' : 'none'),
  },
  social: {
    marginTop: spacing(2),
    marginBottom: spacing(2),
    marginLeft: spacing(1),
  },
  socialMobile: {
    marginTop: spacing(1),
  },
  forgot: {
    alignSelf: 'center',
  },
  forgotmobile: {
    marginTop: spacing(1),
  },
  header: {
    marginTop: spacing(2),
  },
  formControlLabelCheck: {
    height: spacing(1),
  },
  formControlLabelCheckMobile: {
    height: spacing(1),
    alignSelf: 'flex-start',
  },
  checkbox: {
    width: spacing(2),
    height: spacing(2),
  },
  footerPoweredBy: {
    maxHeight: '60%',
    maxWidth: '60%',
    margin: spacing(1),
  },
}));

export const Login = ({
  headerImages,
  headerText,
  subheaderText,
  subheaderTextInnerHtml,
  rememberBox,
  forgotPassword,
  buttonLabel,
  rememberLabel,
  onClick,
  children,
  footerImg,
  variant,
  backgroundImage,
  googleProvider,
  showButton = true,
  disableSubmit = false,
}) => {
  const [remember, setRemember] = useState(false);

  const classes = useStyle({ rememberBox, backgroundImage, showButton });
  const theme = useTheme();
  const matches = useMediaQuery(useTheme().breakpoints.down('xs'));

  let mobile = false;

  if (variant === 'auto') {
    if (matches) {
      mobile = true;
    }
  } else if (variant === 'mobile') {
    mobile = true;
  }

  const headerElem = headerImages && headerImages.length > 0 && (
    <div
      className={clsx(classes.imgHeader, {
        [classes.imgHeaderMobile]: mobile,
      })}
    >
      {headerImages.map(src => (
        <div key={src} className={classes.logoContainer}>
          <img src={src} alt="logo" key={src} className={classes.logo} />
        </div>
      ))}
    </div>
  );

  const contentElem = (
    <div
      className={clsx(classes.content, {
        [classes.contentMobile]: mobile,
      })}
    >
      {headerText && (
        <div className={classes.header}>
          {typeof headerText === 'string' ? (
            <Typography variant="h5">{headerText}</Typography>
          ) : (
            headerText
          )}
          {subheaderText && (
            <Typography variant="body2" color="textSecondary">
              {subheaderText}
            </Typography>
          )}
          {subheaderTextInnerHtml && (
            // eslint-disable-next-line react/no-danger
            <div dangerouslySetInnerHTML={{ __html: subheaderTextInnerHtml }} />
          )}
        </div>
      )}

      <div className={classes.inputData}>
        {children}

        <div className={classes.extra}>
          {rememberBox && (
            <FormControlLabel
              className={classes.formControlLabelCheck}
              control={
                <Checkbox
                  className={classes.checkbox}
                  name="rememberMe"
                  checked={remember}
                  onChange={() => setRemember(oldRemember => !oldRemember)}
                  color="default"
                />
              }
              label={
                <Typography color="textSecondary">{rememberLabel}</Typography>
              }
            />
          )}
          {forgotPassword && forgotPassword.component && (
            <Typography
              className={classes.forgot}
              variant="subtitle2"
              color={mobile ? 'textPrimary' : 'secondary'}
              component={forgotPassword.component}
              {...forgotPassword.props}
            >
              {forgotPassword.label}
            </Typography>
          )}
        </div>
        <Button
          size="large"
          className={classes.submit}
          fullWidth={mobile}
          variant="contained"
          color={renderStyledColor('yellow')}
          onClick={() => (rememberBox ? onClick(remember) : onClick())}
          disableElevation
          disabled={disableSubmit}
        >
          {buttonLabel}
        </Button>
        {googleProvider && googleProvider.loginUrl && (
          <Button
            size="large"
            href={googleProvider.loginUrl}
            className={mobile ? classes.socialMobile : classes.social}
            fullWidth={mobile}
            variant="contained"
            color={renderStyledColor(theme.variant)}
            disableElevation
          >
            {googleProvider.label}
          </Button>
        )}
      </div>
    </div>
  );

  const footerElem = (
    <div
      className={clsx(classes.footer, {
        [classes.footermobile]: mobile,
      })}
    >
      <div className={classes.footerImage}>
        {footerImg ? { footerImg } : <PoweredBy classes={classes} />}
      </div>
    </div>
  );

  if (mobile) {
    return (
      <div className={clsx(classes.root, classes.rootmobile)}>
        {headerElem}
        {contentElem}
        {footerElem}
      </div>
    );
  }

  return (
    <Paper className={classes.root}>
      {headerElem}
      {headerElem && <Divider />}
      {contentElem}
      {footerElem}
    </Paper>
  );
};

Login.defaultProps = {
  headerImages: [],
  headerText: null,
  subheaderText: null,
  subheaderTextInnerHtml: null,
  rememberBox: false,
  forgotPassword: null,
  buttonLabel: 'Acessar o Sistema',
  rememberLabel: 'Lembrar de mim',
  onClick: () => {},
  footerImg: null,
  variant: 'auto',
  backgroundImage: '',
  googleProvider: null,
  disableSubmit: false,
  showButton: true,
};

Login.propTypes = {
  /** Images placed on header */
  headerImages: PropTypes.arrayOf(PropTypes.string),
  /** Text placed on header */
  headerText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** Subheader text */
  subheaderText: PropTypes.string,
  /** Inner html for subheader */
  subheaderTextInnerHtml: PropTypes.string,
  /** Remember me option */
  rememberBox: PropTypes.bool,
  /** Forgot password redirect. If component is `a`, you can pass `{ href: 'URL'}` as `props` */
  forgotPassword: PropTypes.shape({
    component: PropTypes.node,
    props: PropTypes.object,
    label: PropTypes.string,
  }),
  /** Login button show */
  showButton: PropTypes.string,
  /** Login button disable */
  disableSubmit: PropTypes.string,
  /** Login button label */
  buttonLabel: PropTypes.string,
  /** Remember me option label */
  rememberLabel: PropTypes.string,
  /** Login button click event handler */
  onClick: PropTypes.func,
  /** Image placed on footer */
  footerImg: PropTypes.object,
  /** Component variant view */
  variant: PropTypes.oneOf(['auto', 'mobile', 'web']),
  /** Page background image */
  backgroundImage: PropTypes.string,
  /** Google login option */
  googleProvider: PropTypes.shape({
    loginUrl: PropTypes.string,
    label: PropTypes.string,
  }),
};

export default Login;
