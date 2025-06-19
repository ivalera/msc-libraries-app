export interface Library {
  global_id: number;
  Number: number;
  Cells: {
    Category: string;
    CommonName: string;
    FullName: string;
    ShortName: string;
    ChiefOrg: string;
    ChiefName: string;
    ChiefPosition: string;
    PublicPhone: Array<{
      PublicPhone: string;
      global_id: number;
    }>;
    Email: Array<{
      Email: string;
      global_id: number;
    }>;
    WorkingHours: Array<{
      DayWeek: string;
      WorkHours: string;
      global_id: number;
    }>;
    ClarificationOfWorkingHours: string;
    WebSite: string;
    ObjectAddress: Array<{
      AdmArea: string;
      District: string;
      PostalCode: string;
      Address: string;
      global_id: number;
    }>;
    geoData: {
      coordinates: number[][];
      type: string;
    };
  };
}
