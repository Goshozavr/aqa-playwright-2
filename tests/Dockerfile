FROM mcr.microsoft.com/playwright:v1.41.0-jammy

RUN mkdir playwright-tests

COPY . /playwright-tests

WORKDIR /playwright-tests

VOLUME playwright-report/ playwright-report/

RUN npp ci 

CMD ["npm", "test"]