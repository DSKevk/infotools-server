export const clientAttributes = `
    R.id_client,
    CLI.nom AS clientLastname,
    CLI.prenom AS clientFirstname,
    CLI.adresse AS clientAdresse,
    CLI.telephone AS clientTel,
    CLI.mail AS clientMail
`;

export const commercialAttributes = `
    R.id_commercial,
    COM.nom AS commercialLastname,
    COM.prenom AS commercialFirstname,
    COM.adresse AS commercialAdresse,
    COM.telephone AS commercialTel,
    COM.mail AS commercialMail
`;
