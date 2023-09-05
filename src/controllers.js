
import axios from 'axios';
import cheerio from 'cheerio';

export const public_announcement = async (req, res) => {
    try {
        const baseUrl = 'https://ibbi.gov.in/en/public-announcement';

        const requestedPage = req.query.page || 1; // Get the requested page number from query parameter

        async function scrapeDataFromPage(pageNumber) {
            const url = `${baseUrl}?page=${pageNumber}`;

            try {
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);

                const announcements = [];

                $('div.table-responsive table tbody tr').each((index, rowElement) => {
                    const columns = $(rowElement).find('td');
                    const typeOfPA = $(columns[0]).text().trim();
                    const dateOfAnnouncement = $(columns[1]).text().trim();
                    const lastDateOfSubmission = $(columns[2]).text().trim();
                    const corporateDebtor = $(columns[3]).text().trim();
                    const nameOfApplicant = $(columns[4]).text().trim();
                    const nameOfIP = $(columns[5]).text().trim();
                    const pdfLinkElement = $(columns[6]).find('a');
                    const onclickValue = pdfLinkElement.attr('onclick');

                    // Extract the URL from the onclick attribute using a regular expression
                    const pdfUrlMatch = onclickValue.match(/'([^']+)'/);
                    const pdfLink = pdfUrlMatch ? pdfUrlMatch[1] : null;

                    announcements.push({
                        typeOfPA,
                        dateOfAnnouncement,
                        lastDateOfSubmission,
                        corporateDebtor,
                        nameOfApplicant,
                        nameOfIP,
                        pdfLink
                    });
                });

                return announcements;
            } catch (error) {
                console.error('Error fetching web page:', error);
                return [];
            }
        }

        // Scrape data and filter for the requested page
        const scrapedAnnouncements = await scrapeDataFromPage(requestedPage);

        // Respond with the paginated announcements
        res.status(200).json(scrapedAnnouncements);

    } catch (error) {
        console.error('An error occurred on the server side:', error);
        res.status(500).json({ message: "An Error Occurred on the server side" });
    }
};

export const claims = async (req, res) => {
    try {
        const baseUrl = 'https://ibbi.gov.in/en/claims/claim-process';

        const requestedPage = req.query.page || 1; // Get the requested page number from query parameter

        async function scrapeDataFromPage(pageNumber) {
            const url = `${baseUrl}?page=${pageNumber}`;

            try {
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);


                const claimsData = [];

                $('div.table-responsive table tbody tr').each((index, rowElement) => {

                    const columns = $(rowElement).find('td');

                    // Extract data from columns as needed
                    const CorporateDebtor = $(columns[0]).text().trim();
                    const Name_of_IRP_RP_Liquidator = $(columns[1]).text().trim();
                    const Under_Process = $(columns[2]).text().trim();
                    const Latest_Claim_As_On_Date = $(columns[3]).text().trim();
                    const View_Details = $(columns[4]).text().trim();
                    // Add more fields as needed

                    claimsData.push({
                        CorporateDebtor,
                        Name_of_IRP_RP_Liquidator,
                        Under_Process,
                        Latest_Claim_As_On_Date,
                        View_Details
                        // Add more fields here
                    });
                });

                return claimsData;
            } catch (error) {
                console.error('Error fetching web page:', error);
                return [];
            }
        }

        // Scrape data and filter for the requested page
        const scrapedAnnouncements = await scrapeDataFromPage(requestedPage);

        // Respond with the paginated announcements
        res.status(200).json(scrapedAnnouncements);

    } catch (error) {
        console.error('An error occurred on the server side:', error);
        res.status(500).json({ message: "An Error Occurred on the server side" });
    }
};

export const resolution_plans = async (req, res) => {
    try {
        const baseUrl = 'https://ibbi.gov.in/en/resolution-plans';

        const requestedPage = req.query.page || 1; // Get the requested page number from query parameter

        async function scrapeDataFromPage(pageNumber) {
            const url = `${baseUrl}?page=${pageNumber}`;

            try {
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);


                const resolutionplans = [];

                $('div.table-responsive table tbody tr').each((index, rowElement) => {

                    const columns = $(rowElement).find('td');

                    // Extract data from columns as needed
                    const Name_of_Corporate_Debtor = $(columns[0]).text().trim();
                    const Name_of_Resolution_Professional = $(columns[1]).text().trim();
                    const Last_date_for_receipt_of_expression_of_interest = $(columns[2]).text().trim();
                    const Date_of_issue_of_prospective_resolution_applicants = $(columns[3]).text().trim();
                    const Last_date_for_submission_of_objections_to_provisional_lists = $(columns[4]).text().trim();
                    // Add more fields as needed

                    resolutionplans.push({
                        Name_of_Corporate_Debtor,
                        Name_of_Resolution_Professional,
                        Last_date_for_receipt_of_expression_of_interest,
                        Date_of_issue_of_prospective_resolution_applicants,
                        Last_date_for_submission_of_objections_to_provisional_lists
                        // Add more fields here
                    });
                });

                return resolutionplans;
            } catch (error) {
                console.error('Error fetching web page:', error);
                return [];
            }
        }

        // Scrape data and filter for the requested page
        const scrapedAnnouncements = await scrapeDataFromPage(requestedPage);

        // Respond with the paginated announcements
        res.status(200).json(scrapedAnnouncements);

    } catch (error) {
        console.error('An error occurred on the server side:', error);
        res.status(500).json({ message: "An Error Occurred on the server side" });
    }
}

export const auction_notices = async (req, res) => {
    try {
        const baseUrl = 'https://ibbi.gov.in/en/liquidation-auction-notices/lists';

        const requestedPage = req.query.page || 1; // Get the requested page number from query parameter

        async function scrapeDataFromPage(pageNumber) {
            const url = `${baseUrl}?page=${pageNumber}`;

            try {
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);


                const resolutionplans = [];

                $('div.table-responsive table tbody tr').each((index, rowElement) => {

                    const columns = $(rowElement).find('td');

                    // Extract data from columns as needed
                    const Type_of_AN = $(columns[0]).text().trim();
                    const Date = $(columns[1]).text().trim();
                    const Name_of_Corporate_Debtor = $(columns[2]).text().trim();
                    const Date_of_Auction = $(columns[3]).text().trim();
                    const Name_of_Insolvency_Professional = $(columns[4]).text().trim();
                    const Auction_Notice_pdfLinkElement = $(columns[5]).find('a');
                    const onclickValue1 = Auction_Notice_pdfLinkElement.attr('onclick');

                    // Extract the URL from the onclick attribute using a regular expression
                    const pdfUrlMatch1 = onclickValue1.match(/'([^']+)'/);
                    const pdfLink1 = pdfUrlMatch1 ? pdfUrlMatch1[1] : null;

                    const Reserve_Price = $(columns[6]).text().trim();
                    const Nature_of_Assets_to_be_Auctioned = $(columns[7]).text().trim();
                    const Last_Date_of_Submission_of_EMD = $(columns[8]).text().trim();

                    const Details_pdfLinkElement = $(columns[9]).find('a');
                    const onclickValue2 = Details_pdfLinkElement.attr('onclick');

                    // Extract the URL from the onclick attribute using a regular expression
                    const pdfUrlMatch2 = onclickValue2.match(/'([^']+)'/);
                    const pdfLink2 = pdfUrlMatch2 ? pdfUrlMatch2[1] : null;
                    // Add more fields as needed

                    resolutionplans.push({
                        Type_of_AN,
                        Date,
                        Name_of_Corporate_Debtor,
                        Date_of_Auction,
                        Name_of_Insolvency_Professional,
                        pdfLink1,
                        Reserve_Price,
                        Nature_of_Assets_to_be_Auctioned,
                        Last_Date_of_Submission_of_EMD,
                        pdfLink2
                        // Add more fields here
                    });
                });

                return resolutionplans;
            } catch (error) {
                console.error('Error fetching web page:', error);
                return [];
            }
        }

        // Scrape data and filter for the requested page
        const scrapedAnnouncements = await scrapeDataFromPage(requestedPage);

        // Respond with the paginated announcements
        res.status(200).json(scrapedAnnouncements);

    } catch (error) {
        console.error('An error occurred on the server side:', error);
        res.status(500).json({ message: "An Error Occurred on the server side" });
    }
}

export const orders = async (req, res) => {
    try {
        const baseUrl = 'https://ibbi.gov.in/en/orders/nclt';

        const requestedPage = req.query.page || 1; // Get the requested page number from query parameter

        async function scrapeDataFromPage(pageNumber) {
            const url = `${baseUrl}?page=${pageNumber}`;

            try {
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);

                const orders = [];

                $('table tbody tr').each((index, rowElement) => {
                    const columns = $(rowElement).find('td');
                    const Orders_Date = $(columns[0]).text().trim();
                    const linkElement = $(columns[1]).find('a');
                    const Subject = linkElement.text().trim();
                    const pdfLink = linkElement.attr('onclick').match(/'(https:\/\/ibbi\.gov\.in[^']+)'/)[1];
                    const Orders_Remarks = $(columns[2]).text().trim();

                    orders.push({
                        Orders_Date,
                        Subject,
                        pdfLink,
                        Orders_Remarks,
                    });
                });

                return orders;
            } catch (error) {
                console.error('Error fetching web page:', error);
                return [];
            }
        }

        // Scrape data and filter for the requested page
        const scrapedAnnouncements = await scrapeDataFromPage(requestedPage);

        // Respond with the paginated announcements
        res.status(200).json(scrapedAnnouncements);

    } catch (error) {
        console.error('An error occurred on the server side:', error);
        res.status(500).json({ message: "An Error Occurred on the server side" });
    }
}

export const summary_of_outcomes = async (req, res) => {
    try {
        const baseUrl = 'https://ibbi.gov.in/en/claims/cd-summary';

        const requestedPage = req.query.page || 1; // Get the requested page number from query parameter

        async function scrapeDataFromPage(pageNumber) {
            const url = `${baseUrl}?page=${pageNumber}`;

            try {
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);

                const summary = [];

                $('table tbody tr').each((index, rowElement) => {
                    const columns = $(rowElement).find('td');
                    const Date = $(columns[0]).text().trim();
                    const Subject = $(columns[1]).text().trim();

                    // Extract PDF and Excel links
                    const pdfLink = $(columns[2]).find('a').attr('href');
                    const excelLink = $(columns[3]).find('a').attr('href');

                    summary.push({
                        Date,
                        Subject,
                        PDF_File: pdfLink,
                        Excell_file: excelLink,
                    });
                });

                return summary;
            } catch (error) {
                console.error('Error fetching web page:', error);
                return [];
            }
        }

        // Scrape data and filter for the requested page
        const scrapedAnnouncements = await scrapeDataFromPage(requestedPage);

        // Respond with the paginated announcements
        res.status(200).json(scrapedAnnouncements);

    } catch (error) {
        console.error('An error occurred on the server side:', error);
        res.status(500).json({ message: "An Error Occurred on the server side" });
    }
}

//orders

export const supreme_court = async (req, res) => {
    try {
        const baseUrl = 'https://ibbi.gov.in/en/orders/supreme-court';

        const requestedPage = req.query.page || 1; // Get the requested page number from query parameter

        async function scrapeDataFromPage(pageNumber) {
            const url = `${baseUrl}?page=${pageNumber}`;

            try {
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);

                const announcements = [];

                $('div#block-ibbi-content table tbody tr').each((index, rowElement) => {
                    const columns = $(rowElement).find('td');
                    const Orders_Date = $(columns[0]).text().trim();
                    const Subject = $(columns[1]).text().trim();

                    const pdfLinkElement = $(columns[1]).find('a');
                    const onclickValue = pdfLinkElement.attr('onclick');

                    // Extract the URL from the onclick attribute using a regular expression
                    const pdfUrlMatch = onclickValue.match(/'([^']+)'/);
                    const pdfLink = pdfUrlMatch ? pdfUrlMatch[1] : null;

                    const Orders_Remarks = $(columns[2]).text().trim();
             
                    announcements.push({
                        Orders_Date,
                        Subject,
                        pdfLink,
                        Orders_Remarks,
                      
                    });
                });

                return announcements;
            } catch (error) {
                console.error('Error fetching web page:', error);
                return [];
            }
        }

        // Scrape data and filter for the requested page
        const scrapedAnnouncements = await scrapeDataFromPage(requestedPage);

        // Respond with the paginated announcements
        res.status(200).json(scrapedAnnouncements);

    } catch (error) {
        console.error('An error occurred on the server side:', error);
        res.status(500).json({ message: "An Error Occurred on the server side" });
    }
};

export const high_court = async (req, res) => {
    try {
        const baseUrl = 'https://ibbi.gov.in/en/orders/high-courts';

        const requestedPage = req.query.page || 1; // Get the requested page number from query parameter

        async function scrapeDataFromPage(pageNumber) {
            const url = `${baseUrl}?page=${pageNumber}`;

            try {
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);

                const announcements = [];

                $('div#block-ibbi-content table tbody tr').each((index, rowElement) => {
                    const columns = $(rowElement).find('td');
                    const Orders_Date = $(columns[0]).text().trim();
                    const Subject = $(columns[1]).text().trim();

                    const pdfLinkElement = $(columns[1]).find('a');
                    const onclickValue = pdfLinkElement.attr('onclick');

                    // Extract the URL from the onclick attribute using a regular expression
                    const pdfUrlMatch = onclickValue.match(/'([^']+)'/);
                    const pdfLink = pdfUrlMatch ? pdfUrlMatch[1] : null;

                    const Orders_Remarks = $(columns[2]).text().trim();
             
                    announcements.push({
                        Orders_Date,
                        Subject,
                        pdfLink,
                        Orders_Remarks,
                      
                    });
                });

                return announcements;
            } catch (error) {
                console.error('Error fetching web page:', error);
                return [];
            }
        }

        // Scrape data and filter for the requested page
        const scrapedAnnouncements = await scrapeDataFromPage(requestedPage);

        // Respond with the paginated announcements
        res.status(200).json(scrapedAnnouncements);

    } catch (error) {
        console.error('An error occurred on the server side:', error);
        res.status(500).json({ message: "An Error Occurred on the server side" });
    }
};

export const nclat = async (req, res) => {
    try {
        const baseUrl = 'https://ibbi.gov.in/en/orders/nclat';

        const requestedPage = req.query.page || 1; // Get the requested page number from query parameter

        async function scrapeDataFromPage(pageNumber) {
            const url = `${baseUrl}?page=${pageNumber}`;

            try {
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);

                const announcements = [];

                $('div#block-ibbi-content table tbody tr').each((index, rowElement) => {
                    const columns = $(rowElement).find('td');
                    const Orders_Date = $(columns[0]).text().trim();
                    const Subject = $(columns[1]).text().trim();

                    const pdfLinkElement = $(columns[1]).find('a');
                    const onclickValue = pdfLinkElement.attr('onclick');

                    // Extract the URL from the onclick attribute using a regular expression
                    const pdfUrlMatch = onclickValue.match(/'([^']+)'/);
                    const pdfLink = pdfUrlMatch ? pdfUrlMatch[1] : null;

                    const Orders_Remarks = $(columns[2]).text().trim();
             
                    announcements.push({
                        Orders_Date,
                        Subject,
                        pdfLink,
                        Orders_Remarks,
                      
                    });
                });

                return announcements;
            } catch (error) {
                console.error('Error fetching web page:', error);
                return [];
            }
        }

        // Scrape data and filter for the requested page
        const scrapedAnnouncements = await scrapeDataFromPage(requestedPage);

        // Respond with the paginated announcements
        res.status(200).json(scrapedAnnouncements);

    } catch (error) {
        console.error('An error occurred on the server side:', error);
        res.status(500).json({ message: "An Error Occurred on the server side" });
    }
};

export const nclt = async (req, res) => {
    try {
        const baseUrl = 'https://ibbi.gov.in/en/orders/nclt';

        const requestedPage = req.query.page || 1; // Get the requested page number from query parameter

        async function scrapeDataFromPage(pageNumber) {
            const url = `${baseUrl}?page=${pageNumber}`;

            try {
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);

                const announcements = [];

                $('div#block-ibbi-content table tbody tr').each((index, rowElement) => {
                    const columns = $(rowElement).find('td');
                    const Orders_Date = $(columns[0]).text().trim();
                    const Subject = $(columns[1]).text().trim();

                    const pdfLinkElement = $(columns[1]).find('a');
                    const onclickValue = pdfLinkElement.attr('onclick');

                    // Extract the URL from the onclick attribute using a regular expression
                    const pdfUrlMatch = onclickValue.match(/'([^']+)'/);
                    const pdfLink = pdfUrlMatch ? pdfUrlMatch[1] : null;

                    const Orders_Remarks = $(columns[2]).text().trim();
             
                    announcements.push({
                        Orders_Date,
                        Subject,
                        pdfLink,
                        Orders_Remarks,
                      
                    });
                });

                return announcements;
            } catch (error) {
                console.error('Error fetching web page:', error);
                return [];
            }
        }

        // Scrape data and filter for the requested page
        const scrapedAnnouncements = await scrapeDataFromPage(requestedPage);

        // Respond with the paginated announcements
        res.status(200).json(scrapedAnnouncements);

    } catch (error) {
        console.error('An error occurred on the server side:', error);
        res.status(500).json({ message: "An Error Occurred on the server side" });
    }
};

export const drat = async (req, res) => {
    try {
        const baseUrl = 'https://ibbi.gov.in/en/orders/drat';

        const requestedPage = req.query.page || 1; // Get the requested page number from query parameter

        async function scrapeDataFromPage(pageNumber) {
            const url = `${baseUrl}?page=${pageNumber}`;

            try {
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);

                const announcements = [];

                $('div#block-ibbi-content table tbody tr').each((index, rowElement) => {
                    const columns = $(rowElement).find('td');
                    const Orders_Date = $(columns[0]).text().trim();
                    const Subject = $(columns[1]).text().trim();

                    const pdfLinkElement = $(columns[1]).find('a');
                    const onclickValue = pdfLinkElement.attr('onclick');

                    // Extract the URL from the onclick attribute using a regular expression
                    const pdfUrlMatch = onclickValue.match(/'([^']+)'/);
                    const pdfLink = pdfUrlMatch ? pdfUrlMatch[1] : null;

                    const Orders_Remarks = $(columns[2]).text().trim();
             
                    announcements.push({
                        Orders_Date,
                        Subject,
                        pdfLink,
                        Orders_Remarks,
                      
                    });
                });

                return announcements;
            } catch (error) {
                console.error('Error fetching web page:', error);
                return [];
            }
        }

        // Scrape data and filter for the requested page
        const scrapedAnnouncements = await scrapeDataFromPage(requestedPage);

        // Respond with the paginated announcements
        res.status(200).json(scrapedAnnouncements);

    } catch (error) {
        console.error('An error occurred on the server side:', error);
        res.status(500).json({ message: "An Error Occurred on the server side" });
    }
};

export const drts = async (req, res) => {
    try {
        const baseUrl = 'https://ibbi.gov.in/en/orders/drts';

        const requestedPage = req.query.page || 1; // Get the requested page number from query parameter

        async function scrapeDataFromPage(pageNumber) {
            const url = `${baseUrl}?page=${pageNumber}`;

            try {
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);

                const announcements = [];

                $('div#block-ibbi-content table tbody tr').each((index, rowElement) => {
                    const columns = $(rowElement).find('td');
                    const Orders_Date = $(columns[0]).text().trim();
                    const Subject = $(columns[1]).text().trim();

                    const pdfLinkElement = $(columns[1]).find('a');
                    const onclickValue = pdfLinkElement.attr('onclick');

                    // Extract the URL from the onclick attribute using a regular expression
                    const pdfUrlMatch = onclickValue.match(/'([^']+)'/);
                    const pdfLink = pdfUrlMatch ? pdfUrlMatch[1] : null;

                    const Orders_Remarks = $(columns[2]).text().trim();
             
                    announcements.push({
                        Orders_Date,
                        Subject,
                        pdfLink,
                        Orders_Remarks,
                      
                    });
                });

                return announcements;
            } catch (error) {
                console.error('Error fetching web page:', error);
                return [];
            }
        }

        // Scrape data and filter for the requested page
        const scrapedAnnouncements = await scrapeDataFromPage(requestedPage);

        // Respond with the paginated announcements
        res.status(200).json(scrapedAnnouncements);

    } catch (error) {
        console.error('An error occurred on the server side:', error);
        res.status(500).json({ message: "An Error Occurred on the server side" });
    }
};

export const ibbi = async (req, res) => {
    try {
        const baseUrl = 'https://ibbi.gov.in/en/orders/ibbi';

        const requestedPage = req.query.page || 1; // Get the requested page number from query parameter

        async function scrapeDataFromPage(pageNumber) {
            const url = `${baseUrl}?page=${pageNumber}`;

            try {
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);

                const announcements = [];

                $('div#block-ibbi-content table tbody tr').each((index, rowElement) => {
                    const columns = $(rowElement).find('td');
                    const Orders_Date = $(columns[0]).text().trim();
                    const Subject = $(columns[1]).text().trim();

                    const pdfLinkElement = $(columns[1]).find('a');
                    const onclickValue = pdfLinkElement.attr('onclick');

                    // Extract the URL from the onclick attribute using a regular expression
                    const pdfUrlMatch = onclickValue.match(/'([^']+)'/);
                    const pdfLink = pdfUrlMatch ? pdfUrlMatch[1] : null;

                    const Orders_Remarks = $(columns[2]).text().trim();
             
                    announcements.push({
                        Orders_Date,
                        Subject,
                        pdfLink,
                        Orders_Remarks,
                      
                    });
                });

                return announcements;
            } catch (error) {
                console.error('Error fetching web page:', error);
                return [];
            }
        }

        // Scrape data and filter for the requested page
        const scrapedAnnouncements = await scrapeDataFromPage(requestedPage);

        // Respond with the paginated announcements
        res.status(200).json(scrapedAnnouncements);

    } catch (error) {
        console.error('An error occurred on the server side:', error);
        res.status(500).json({ message: "An Error Occurred on the server side" });
    }
};

export const ipa_rvo = async (req, res) => {
    try {
        const baseUrl = 'https://ibbi.gov.in/en/orders/ipa-rvo';

        const requestedPage = req.query.page || 1; // Get the requested page number from query parameter

        async function scrapeDataFromPage(pageNumber) {
            const url = `${baseUrl}?page=${pageNumber}`;

            try {
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);

                const announcements = [];

                $('div#block-ibbi-content table tbody tr').each((index, rowElement) => {
                    const columns = $(rowElement).find('td');
                    const Orders_Date = $(columns[0]).text().trim();
                    const Subject = $(columns[1]).text().trim();

                    const pdfLinkElement = $(columns[1]).find('a');
                    const onclickValue = pdfLinkElement.attr('onclick');

                    // Extract the URL from the onclick attribute using a regular expression
                    const pdfUrlMatch = onclickValue.match(/'([^']+)'/);
                    const pdfLink = pdfUrlMatch ? pdfUrlMatch[1] : null;

                    const Orders_Remarks = $(columns[2]).text().trim();
             
                    announcements.push({
                        Orders_Date,
                        Subject,
                        pdfLink,
                        Orders_Remarks,
                      
                    });
                });

                return announcements;
            } catch (error) {
                console.error('Error fetching web page:', error);
                return [];
            }
        }

        // Scrape data and filter for the requested page
        const scrapedAnnouncements = await scrapeDataFromPage(requestedPage);

        // Respond with the paginated announcements
        res.status(200).json(scrapedAnnouncements);

    } catch (error) {
        console.error('An error occurred on the server side:', error);
        res.status(500).json({ message: "An Error Occurred on the server side" });
    }
};

export const other_courts= async (req, res) => {
    try {
        const baseUrl = 'https://ibbi.gov.in/en/orders/other-courts';

        const requestedPage = req.query.page || 1; // Get the requested page number from query parameter

        async function scrapeDataFromPage(pageNumber) {
            const url = `${baseUrl}?page=${pageNumber}`;

            try {
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);

                const announcements = [];

                $('div#block-ibbi-content table tbody tr').each((index, rowElement) => {
                    const columns = $(rowElement).find('td');
                    const Orders_Date = $(columns[0]).text().trim();
                    const Subject = $(columns[1]).text().trim();

                    const pdfLinkElement = $(columns[1]).find('a');
                    const onclickValue = pdfLinkElement.attr('onclick');

                    // Extract the URL from the onclick attribute using a regular expression
                    const pdfUrlMatch = onclickValue.match(/'([^']+)'/);
                    const pdfLink = pdfUrlMatch ? pdfUrlMatch[1] : null;

                    const Orders_Remarks = $(columns[2]).text().trim();
             
                    announcements.push({
                        Orders_Date,
                        Subject,
                        pdfLink,
                        Orders_Remarks,
                      
                    });
                });

                return announcements;
            } catch (error) {
                console.error('Error fetching web page:', error);
                return [];
            }
        }

        // Scrape data and filter for the requested page
        const scrapedAnnouncements = await scrapeDataFromPage(requestedPage);

        // Respond with the paginated announcements
        res.status(200).json(scrapedAnnouncements);

    } catch (error) {
        console.error('An error occurred on the server side:', error);
        res.status(500).json({ message: "An Error Occurred on the server side" });
    }
};
