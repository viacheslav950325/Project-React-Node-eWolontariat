import { FormType } from './store/dialogSlice';
import { Rejestracja } from './dialogs/Rejestracja/Rejestracja';
import { ZalozonyProfil } from './dialogs/ZalozonyProfil/ZalozonyProfil';
import { LoginDialog } from './dialogs/LoginDialog/LoginDialog';
import { RejestracjaEmail } from './dialogs/RejestracjaEmail/RejestracjaEmail';

// rodzaje szerokości type Width = false | "sm" | "md" | "xs" | "lg" | "xl";

export const getDialogEl = (formType) => {
  const map = new Map([
    [
      FormType.rejestracja,
      {
        title: 'Zarejestruj się',
        component: <Rejestracja />,
        width: "xs",
      },
    ],
    [
      FormType.zalozonyProfil,
      {
        title: 'Gratulacje!',
        component: <ZalozonyProfil />,
        width: "xs",
      },
    ],
    [
      FormType.loginDialog,
      {
        title: 'Zaloguj się',
        component: <LoginDialog />,
        width: "xs",
      },
    ],
    [
      FormType.rejestracjaEmail,
      {
        title: 'Rejestracja',
        component: <RejestracjaEmail />,
        width: "xs",
      },
    ]
  ]);

  return map.get(formType);
};