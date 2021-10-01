import * as Yup from "yup";
import AppError from "../../errors/AppError";
import Company from "../../models/Company";

interface CompanyData {
  name: string;
  cnpj?: string;
  fantasia?: string;
  inscricaoEstadual?: string;
  razao?: string;
  greetingMessage?: string;
}

const CreateCompanyService = async (
  companyData: CompanyData
): Promise<Company> => {
  const { cnpj, fantasia, inscricaoEstadual, razao, greetingMessage } =
    companyData;
  const companySchema = Yup.object().shape({
    cnpj: Yup.string()
      .required("ERR_CNPJ_REQUIRED")
      .test("Check-intent-exists", "ERR_CNPJ_ALREADY_EXISTS", async value => {
        if (value) {
          const cnpjWithExistes = await Company.findOne({
            where: { cnpj: value }
          });
          return !cnpjWithExistes;
        }
        return false;
      })
  });

  try {
    await companySchema.validate({ cnpj });
  } catch (err) {
    throw new AppError(err.message);
  }

  try {
    const company = await Company.create({
      cnpj,
      fantasia,
      inscricaoEstadual,
      name: razao,
      greetingMessage
    });
    return company;
  } catch (error) {
    throw new AppError("Cannot insert the new company. Check and try again!");
  }
};

export default CreateCompanyService;
