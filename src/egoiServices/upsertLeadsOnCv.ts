import { GetContactsEgoi } from "./xhrContactApiBySegment";

export const UpsertLeadsOnCv = async () => {
  const result = await GetContactsEgoi();
  setTimeout(() => {
    UpsertLeadsOnCv();
  }, 60000);
  console.log(result);
};
