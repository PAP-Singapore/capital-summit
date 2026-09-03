import { statValues } from "../data/constants";

const Stats = () => {
  return (
    <div className="w-full py-10 pb-9 lg:py-14 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <h3 className="text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-light leading-tight md:leading-tight font-headline text-text-medium mb-6 text-balance">
          2025 in numbers
        </h3>
        <div className="flex flex-col md:flex-row gap-14 md:gap-24 xl:gap-40 laptop:gap-50 justify-between">
          <div className="w-full md:w-[300px] relative">
            <div className="border-with-dot" />
            <h3 className="text-primary text-[32px] sm:text-[40px] md:text-[50px] lg:text-[80px] leading-[0.9] font-normal font-headline tracking-tight mt-7">
              {statValues.totalAttendees.value}
            </h3>
            <p className="text-text-medium text-[14px] md:text-[14px] lg:text-xl font-sans font-medium md:ml-1 tracking-wide ">
              {statValues.totalAttendees.lable}
            </p>
          </div>
          <div className="flex-1">
            <div className="flex gap-8 pt-7 relative">
              <div className="border-without-dot" />
              {statValues.companies.map((com, index) => {
                return (
                  <div
                    key={index}
                    className="w-[33%] md:w-[150px] lg:w-[230px] xl:w-[280px] laptop:w-[330px]"
                  >
                    <h3 className="text-primary text-[32px] sm:text-[40px] md:text-[50px] lg:text-[80px] leading-[0.9] font-normal font-headline tracking-tight">
                      {com.value}
                    </h3>
                    <p className="text-text-medium text-[14px] md:text-[14px] lg:text-xl font-sans font-medium md:ml-1 tracking-wide ">
                      {com.lable}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-8">
              {statValues.attendances.map((comp, index) => {
                return (
                  <div
                    key={index}
                    className="w-full md:w-[150px] lg:w-[230px] xl:w-[280px] laptop:w-[330px] mt-10 lg:mt-20"
                  >
                    <div className=" relative pt-7">
                      <div className="border-without-dot" />
                      <h3 className="text-primary text-[32px] sm:text-[40px] md:text-[50px] lg:text-[80px] leading-[0.9] font-normal font-headline tracking-tight">
                        {comp.value}
                      </h3>
                      <p className="text-text-medium text-[14px] md:text-[14px] lg:text-xl font-sans font-medium md:ml-1 tracking-wide ">
                        {comp.lable}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-8">
              {statValues.siteStats.map((comp, index) => {
                return (
                  <div
                    key={index}
                    className="w-[33%] md:w-[150px] lg:w-[230px] xl:w-[280px] laptop:w-[330px] mt-10 lg:mt-20"
                  >
                    <div className=" relative pt-7">
                      <div className="border-without-dot" />
                      <h3 className="text-primary text-[32px] sm:text-[40px] md:text-[50px] lg:text-[80px] leading-[0.9] font-normal font-headline tracking-tight">
                        {comp.value}
                      </h3>
                      <p className="text-text-medium text-[14px] md:text-[14px] lg:text-xl font-sans font-medium md:ml-1 tracking-wide ">
                        {comp.lable}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
