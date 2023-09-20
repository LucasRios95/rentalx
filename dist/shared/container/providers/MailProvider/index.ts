import { container } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";


const mailService = {
   ethereal: new EtherealMailProvider(),
   ses: new SESMailProvider(),
};


container.registerInstance<IMailProvider>(
    "MailProvider",
    mailService[process.env.mail]
);

