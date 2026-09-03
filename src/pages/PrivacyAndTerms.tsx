import React from "react";
import { privacyItems } from "../data/constants";

const PrivacyAndTerms = () => {
  return (
    <div className="mb-5 md:mb-10">
      <div className="bg-background flex flex-col mt-[18px] md:mt-[24px] lg:mt-[30px]">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-11 pt-4 md:pt-7">
          <p className="font-headline text-[16px] md:text-[28px] lg:text-[32px] leading-[110%] text-text-medium font-light">
            Party Action People Pte. Ltd. (UEN: 202111913D), 951 Goldhill Plaza,
            #07-07, Singapore 308900, operates{" "}
            <span className="text-primary">
              Stable Summit, Vault Summit and Agentic Finance Day (the
              “Events”).
            </span>
          </p>
          <h2 className="font-headline text-[16px] md:text-[28px] lg:text-[32px] leading-[110%] text-text-medium font-medium mt-5 md:mt-12">
            1. Data We Collect
          </h2>
          <p className="text-text-medium font-sans text-xs md:text-base lg:text-xl font-normal leading-tight mt-4">
            We may collect personal data including name, job title,
            organisation, contact details, billing information, participation
            records, badge scans and website usage data.
          </p>
          <h2 className="font-headline text-[16px] md:text-[28px] lg:text-[32px] leading-[110%] text-text-medium font-medium mt-5 md:mt-12">
            2. How We Use Data
          </h2>
          <p className="text-text-medium font-sans text-xs md:text-base lg:text-xl font-normal leading-tight mt-4">
            We process personal data to:
            <div className="mt-4">
              <ul className="flex flex-col gap-1.5 ml-5">
                {privacyItems.map((item, idx) => {
                  return (
                    <li className="flex items-center gap-3" key={idx}>
                      <span className="w-2 h-2 md:w-2 md:h-2 lg:w-2 lg:h-2 bg-text-medium block relative shrink-0"></span>
                      <span className="text-text-medium font-sans text-xs md:text-base lg:text-xl font-normal leading-tight">
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </p>

          <h2 className="font-headline text-[16px] md:text-[28px] lg:text-[32px] leading-[110%] text-text-medium font-medium mt-5 md:mt-12">
            3. Sponsor Interactions
          </h2>
          <p className="text-text-medium font-sans text-xs md:text-base lg:text-xl font-normal leading-tight mt-4">
            Where disclosed at registration, limited attendee contact
            information may be shared with Event sponsors for business
            networking purposes. Sponsors will process such information in
            accordance with their own privacy policies.
          </p>

          <h2 className="font-headline text-[16px] md:text-[28px] lg:text-[32px] leading-[110%] text-text-medium font-medium mt-5 md:mt-12">
            4. Recordings
          </h2>
          <p className="text-text-medium font-sans text-xs md:text-base lg:text-xl font-normal leading-tight mt-4">
            Events may be recorded and photographed. By attending, you consent
            to the use of your image in event materials and promotional content.
          </p>

          <h2 className="font-headline text-[16px] md:text-[28px] lg:text-[32px] leading-[110%] text-text-medium font-medium mt-5 md:mt-12">
            5. International Transfers
          </h2>
          <p className="text-text-medium font-sans text-xs md:text-base lg:text-xl font-normal leading-tight mt-4">
            As an international organiser, personal data may be processed in
            Singapore, the United States, the European Union or other
            jurisdictions, subject to appropriate safeguards.
          </p>

          <h2 className="font-headline text-[16px] md:text-[28px] lg:text-[32px] leading-[110%] text-text-medium font-medium mt-5 md:mt-12">
            6. Data Retention
          </h2>
          <p className="text-text-medium font-sans text-xs md:text-base lg:text-xl font-normal leading-tight mt-4">
            We retain personal data only as long as necessary for event
            administration, compliance and archival purposes.
          </p>

          <h2 className="font-headline text-[16px] md:text-[28px] lg:text-[32px] leading-[110%] text-text-medium font-medium mt-5 md:mt-12">
            7. Your Rights
          </h2>
          <p className="text-text-medium font-sans text-xs md:text-base lg:text-xl font-normal leading-tight mt-4">
            Where applicable, you may request access, correction or deletion of
            your personal data by contacting:{" "}
            <a href="mailto:info@partyactionpeople.com.">
              info@partyactionpeople.com.
            </a>
          </p>

          <h2 className="font-headline text-[16px] md:text-[28px] lg:text-[32px] leading-[110%] text-text-medium font-medium mt-5 md:mt-12">
            8. Contact
          </h2>
          <p className="text-text-medium font-sans text-xs md:text-base lg:text-xl font-normal leading-tight mt-4">
            Party Action People Pte. Ltd.
          </p>
          <div className="flex items-center">
            <p className="text-text-medium font-sans text-xs md:text-base lg:text-xl font-normal leading-tight mt-4">
              Email:
            </p>
            <a
              className="text-text-medium font-sans text-xs md:text-base lg:text-xl font-normal leading-tight mt-4"
              href="mailto:info@partyactionpeople.com."
            >
              info@partyactionpeople.com.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndTerms;
