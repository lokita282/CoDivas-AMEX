const shortCodes = {
    health: 'HEA',
    agriculture: 'AGR',
    education: 'EDU',
    food: 'FOD',
    housing: 'HOU',
    transportation: 'TRA',
    utility: 'UTI',
    telecommunication: 'TEL',
    other: 'OTH'
};

const organisationDetails = [
    {
        orgId: 678431,
        orgName: 'Think360',
        orgLogo:
            'https://res.cloudinary.com/dlwpoojua/image/upload/v1686227018/amex-hackathon/think360_eb4917.png'
    },
    {
        orgId: 689346,
        orgName: 'Stark Industries',
        orgLogo:
            'https://res.cloudinary.com/dlwpoojua/image/upload/v1686227186/amex-hackathon/stark_qhw2ee.png'
    },
    {
        orgId: 549012,
        orgName: 'National Health Authority of India',
        orgLogo:
            'https://res.cloudinary.com/dlwpoojua/image/upload/v1686227187/amex-hackathon/nha_mbgupt.png'
    },
    {
        orgId: 549012,
        orgName: 'Odisha Government',
        orgLogo:
            'https://res.cloudinary.com/dlwpoojua/image/upload/v1686227382/amex-hackathon/odishaGovt_xcs0ek.png'
    },
    {
        orgId: 120871,
        orgName: 'Pratham Foundation',
        orgLogo:
            'https://res.cloudinary.com/dlwpoojua/image/upload/v1686227613/amex-hackathon/pratham_tvjgwi.png'
    },
    {
        orgId: 989791,
        orgName: 'Goonj Foundation',
        orgLogo:
            'https://res.cloudinary.com/dlwpoojua/image/upload/v1686227613/amex-hackathon/goonj_tu8yre.png'
    }
];

const stateCodes = [
    {
        code: 'IN-BR',
        state: 'Bihar'
    },
    {
        code: 'IN-PY',
        state: 'Puducherry'
    },
    {
        code: 'IN-DD',
        state: 'Daman and Diu'
    },
    {
        code: 'IN-DN',
        state: 'Dadra and Nagar Haveli'
    },
    {
        code: 'IN-DL',
        state: 'Delhi'
    },
    {
        code: 'IN-NL',
        state: 'Nagaland'
    },
    {
        code: 'IN-WB',
        state: 'West Bengal'
    },
    {
        code: 'IN-HR',
        state: 'Haryana'
    },
    {
        code: 'IN-HP',
        state: 'Himachal Pradesh'
    },
    {
        code: 'IN-AS',
        state: 'Assam'
    },
    {
        code: 'IN-UT',
        state: 'Uttaranchal'
    },
    {
        code: 'IN-JH',
        state: 'Jharkhand'
    },
    {
        code: 'IN-JK',
        state: 'Jammu and Kashmir'
    },
    {
        code: 'IN-UP',
        state: 'Uttar Pradesh'
    },
    {
        code: 'IN-SK',
        state: 'Sikkim'
    },
    {
        code: 'IN-MZ',
        state: 'Mizoram'
    },
    {
        code: 'IN-CT',
        state: 'Chhattisgarh'
    },
    {
        code: 'IN-CH',
        state: 'Chandigarh'
    },
    {
        code: 'IN-GA',
        state: 'Goa'
    },
    {
        code: 'IN-GJ',
        state: 'Gujarat'
    },
    {
        code: 'IN-RJ',
        state: 'Rajasthan'
    },
    {
        code: 'IN-MP',
        state: 'Madhya Pradesh'
    },
    {
        code: 'IN-OR',
        state: 'Orissa'
    },
    {
        code: 'IN-TN',
        state: 'Tamil Nadu'
    },
    {
        code: 'IN-AN',
        state: 'Andaman and Nicobar'
    },
    {
        code: 'IN-AP',
        state: 'Andhra Pradesh'
    },
    {
        code: 'IN-TR',
        state: 'Tripura'
    },
    {
        code: 'IN-AR',
        state: 'Arunachal Pradesh'
    },
    {
        code: 'IN-KA',
        state: 'Karnataka'
    },
    {
        code: 'IN-PB',
        state: 'Punjab'
    },
    {
        code: 'IN-ML',
        state: 'Meghalaya'
    },
    {
        code: 'IN-MN',
        state: 'Manipur'
    },
    {
        code: 'IN-MH',
        state: 'Maharashtra'
    },
    {
        code: 'IN-KL',
        state: 'Kerala'
    }
];

module.exports = {
    shortCodes,
    organisationDetails,
    stateCodes
};
