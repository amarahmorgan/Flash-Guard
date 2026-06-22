export type SelectorList = string | string[];

const byText = (text: string) => `android=new UiSelector().text("${text}")`;
const byTextContains = (text: string) => `android=new UiSelector().textContains("${text}")`;
const byEditText = (index: number) => `android=new UiSelector().className("android.widget.EditText").instance(${index})`;
const byButtonText = (text: string) => [
  `~${text}`,
  byText(text),
  `//*[@text="${text}"]`,
];

export const selectors = {
  auth: {
    screen: ['~auth-screen', byTextContains('Welcome Back'), '//*[contains(@text,"Welcome Back")]'],
    emailInput: ['~login-email-input', '~auth-email-input', byEditText(0), '(//android.widget.EditText)[1]'],
    passwordInput: ['~login-password-input', '~auth-password-input', byEditText(1), '(//android.widget.EditText)[2]'],
    signInButton: ['~login-submit-button', '~auth-sign-in-button', byText('Sign In'), '//*[@text="Sign In"]'],
    cameraFaceButton: ['~login-camera-face-button', byTextContains('Camera Face Check'), '//*[contains(@text,"Camera Face Check")]'],
    signupLink: ['~go-to-signup-link', byTextContains('Create an Account'), '//*[contains(@text,"Create an Account")]'],
    signupTitle: ['~signup-screen-title', byTextContains('Personal Details'), '//*[contains(@text,"Personal Details")]'],
    signupBackButton: ['~signup-back-to-login-button', byText('‹'), byTextContains('PrimeFin SA')],
    faceCheckTitle: [byText('Face Check'), '//*[@text="Face Check"]'],
    faceCheckCancel: [byText('Cancel'), '//*[@text="Cancel"]'],
  },

  nav: {
    dashboard: ['~bottom-tab-dashboard', '~nav-dashboard', byText('Dashboard'), '//*[@text="Dashboard"]'],
    services: ['~bottom-tab-airtime', '~nav-airtime', '~nav-services', byText('Services'), '//*[@text="Services"]'],
    transfer: ['~bottom-tab-transfer', '~nav-transfer', byText('Transact'), '//*[@text="Transact"]'],
    history: ['~bottom-tab-history', '~nav-history', byText('History'), '//*[@text="History"]'],
    account: ['~bottom-tab-account', '~nav-account', byText('Account'), '//*[@text="Account"]'],
  },

  dashboard: {
    screen: ['~dashboard-screen', byTextContains('Total Net Worth'), byTextContains('Current Account'), '//*[contains(@text,"Total Net Worth")]'],
    balance: ['~dashboard-balance', byTextContains('R 4,829'), byTextContains('R 125,430'), '//*[contains(@text,"R ")]'],
    recentTransactions: [byTextContains('Woolworths'), byTextContains('Dividend Payment'), byTextContains('Recent')],
    refreshAction: [byTextContains('Refresh'), '~dashboard-refresh-button'],
    pendingApprovals: [byTextContains('Pending'), byTextContains('approval')],
  },

  transfer: {
    screen: ['~transfer-screen', byTextContains('Transfer Details'), byTextContains('To Beneficiary'), '//*[contains(@text,"Transfer Details")]'],
    searchInput: ['~transfer-recipient-search-input', byEditText(0), '(//android.widget.EditText)[1]'],
    recipientAlice: ['~transfer-recipient-alice', byTextContains('Alice'), '//*[contains(@text,"Alice")]'],
    recipientElon: ['~transfer-recipient-elon', byTextContains('Elon'), '//*[contains(@text,"Elon")]'],
    amountInput: ['~transfer-amount-input', byEditText(1), '(//android.widget.EditText)[2]'],
    yourReferenceInput: ['~transfer-your-reference-input', byEditText(2), '(//android.widget.EditText)[3]'],
    theirReferenceInput: ['~transfer-their-reference-input', byEditText(3), '(//android.widget.EditText)[4]'],
    instantSwitch: ['~transfer-instant-switch', 'android=new UiSelector().className("android.widget.Switch").instance(0)', '//android.widget.Switch'],
    reviewButton: ['~transfer-submit-button', '~transfer-review-button', byTextContains('Review Transaction'), '//*[contains(@text,"Review Transaction")]'],
    totalAmount: ['~transfer-total-amount', byTextContains('Total Amount'), '//*[contains(@text,"Total Amount")]'],
    successText: [byTextContains('Transfer submitted'), byTextContains('submitted'), byTextContains('pending')],
    cancelModalText: [byTextContains('Cancel'), byTextContains('discard')],
  },

  history: {
    screen: ['~history-screen-title', '~history-screen', byText('History'), '//*[@text="History"]'],
    totalSpending: ['~history-total-spending', byTextContains('Total Spending'), '//*[contains(@text,"Total Spending")]'],
    filterAll: ['~history-filter-all', byText('All'), '//*[@text="All"]'],
    filterPending: ['~history-filter-pending', byText('Pending'), '//*[@text="Pending"]'],
    filterCompleted: ['~history-filter-completed', byText('Completed'), '//*[@text="Completed"]'],
    transactionRow: ['~history-transaction-row', byTextContains('Transfer #'), byTextContains('Woolworths'), '//*[contains(@text,"Transfer") or contains(@text,"Woolworths")]'],
    otpInput: ['~history-otp-input', byTextContains('Enter 6-digit OTP'), 'android=new UiSelector().className("android.widget.EditText").instance(0)', '(//android.widget.EditText)[1]'],
    approveButton: ['~history-approve-button', byText('Approve'), '//*[@text="Approve"]'],
    insightCard: [byTextContains('Spending Insight'), '//*[contains(@text,"Spending Insight")]'],
  },

  airtime: {
    screen: ['~airtime-screen', byTextContains('Airtime & Data'), '//*[contains(@text,"Airtime & Data")]'],
    phoneInput: ['~airtime-phone-input', byTextContains('00 000 0000'), 'android=new UiSelector().className("android.widget.EditText").instance(0)', '(//android.widget.EditText)[1]'],
    modeAirtime: ['~recharge-mode-airtime', byText('Airtime'), '//*[@text="Airtime"]'],
    modeData: ['~recharge-mode-data', byText('Data Bundles'), '//*[@text="Data Bundles"]'],
    amount50: ['~recharge-amount-50', byText('50'), '//*[@text="50"]'],
    purchaseButton: ['~recharge-purchase-button', byText('Purchase'), '//*[@text="Purchase"]'],
    networkMtn: ['~network-mtn', byText('MTN'), '//*[@text="MTN"]'],
  },

  notifications: {
    bell: ['~notifications-button', byText('!'), '//*[@text="!"]'],
    pendingChip: [byText('Pending'), byTextContains('Pending')],
    permissionText: [byTextContains('permission'), byTextContains('Allow'), byTextContains('Deny')],
  },

  account: {
    screen: ['~account-screen', byText('Account'), byTextContains('Private banking profile'), '//*[contains(@text,"Private banking profile")]'],
    profileName: ['~account-profile-name', byTextContains('PrimeFin'), byTextContains('Alice')],
    biometricRow: [byTextContains('Biometric login'), '//*[contains(@text,"Biometric login")]'],
    notificationsRow: [byTextContains('Notifications'), '//*[contains(@text,"Notifications")]'],
    securitySection: [byText('Security'), '//*[@text="Security"]'],
  },
} as const;
