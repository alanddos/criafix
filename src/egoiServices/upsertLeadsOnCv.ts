import { GetContactsEgoi } from "./xhrContactApiBySegment";

let offsetlead = 0;
const sendLead = async () => {
  const limit = 1;
  const segment = 13;
  const idsituacao = 1;

  const data: any = await GetContactsEgoi(
    offsetlead,
    limit,
    segment,
    idsituacao
  );

  if (offsetlead < data.total_items) {
    offsetlead++;
    setTimeout(() => {
      sendLead();
    }, 5000);
  } else {
    offsetlead = 0;
    setTimeout(() => {
      sendLead();
    }, 600000);
  }
};

let offsetpr1 = 0;
const sendProspect1 = async () => {
  const limit = 1;
  const segment = 14;
  const idsituacao = 2;

  const data: any = await GetContactsEgoi(
    offsetpr1,
    limit,
    segment,
    idsituacao
  );

  if (offsetpr1 < data.total_items) {
    offsetpr1++;
    setTimeout(() => {
      sendProspect1();
    }, 5000);
  } else {
    offsetpr1 = 0;
    setTimeout(() => {
      sendProspect1();
    }, 600000);
  }
};

let offsetpr2 = 0;
const sendProspect2 = async () => {
  const limit = 1;
  const segment = 15;
  const idsituacao = 12;

  const data: any = await GetContactsEgoi(
    offsetpr2,
    limit,
    segment,
    idsituacao
  );

  if (offsetpr2 < data.total_items) {
    offsetpr2++;
    setTimeout(() => {
      sendProspect2();
    }, 5000);
  } else {
    offsetpr2 = 0;
    setTimeout(() => {
      sendProspect2();
    }, 600000);
  }
};

export const UpsertLeadsOnCv = async () => {
  sendLead();
  sendProspect1();
  sendProspect2();
};
