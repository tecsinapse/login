import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { Input, ThemeProvider } from '@tecsinapse/ui-kit';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { Login } from '../src';
import { headerImages2 } from '../src/Login/headerImages';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
  success: {
    main: 'pink',
  },
});

test('Render Login', () => {
  const { container, getByText } = render(
    <ThemeProvider variant="orange">
      <MuiThemeProvider theme={theme}>
        <Login
          rememberBox={false}
          headerImages={headerImages2}
          headerText={
            <Typography variant="h5">Recuperação de Senha</Typography>
          }
          subheaderText="Informe abaixo o seu e-mail cadastrado no sistema."
          buttonLabel="Enviar nova senha"
          onClick={() => /* console.log("Recupera!!!!") */ null}
        >
          <Input
            name="recupera"
            label="E-mail cadastrado"
            style={{ width: '100%' }}
            startAdornment={<AccountCircle />}
          />
        </Login>
      </MuiThemeProvider>
    </ThemeProvider>
  );
  expect(container).toContainElement(getByText('Recuperação de Senha'));
});
