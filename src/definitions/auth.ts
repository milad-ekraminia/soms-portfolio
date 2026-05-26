const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const AUTH_URL = import.meta.env.VITE_AUTH_SERVER_URL;
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
const IS_MOCK = import.meta.env.VITE_MOCK == "true";

const defaultScope =
  "address email phone profile roles AuthServer IdentityService AdministrationService CessService ConfigurationService ControlCenterService EmbeddedBiService GisService MessageService NotificationService SampleService TopologyService SaasService AuditLoggingService GdprService FileManagementService LanguageService ChatService";

// When showing a mock/demo build, avoid redirecting to a real auth server.
// In mock mode we point endpoints to frontend-safe mock paths (no external redirect).
export const authConfig = {
  clientId: CLIENT_ID,
  scope: defaultScope,
  authorizationEndpoint: IS_MOCK
    ? `${FRONTEND_URL}/`
    : `${AUTH_URL}/connect/authorize`,
  tokenEndpoint: IS_MOCK
    ? `${FRONTEND_URL}/__mock__/token`
    : `${AUTH_URL}/connect/token`,
  redirectUri: `${FRONTEND_URL}/`,
  onRefreshTokenExpire: (event: any) => {
    event.logIn(undefined, undefined, "redirect");
  },
  logoutEndpoint: IS_MOCK
    ? `${FRONTEND_URL}/login`
    : `${AUTH_URL}/connect/endsession`,
  logoutRedirect: `${FRONTEND_URL}/signout-callback-oidc`,
};
