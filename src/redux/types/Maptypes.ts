interface MapTypes {
  description: string;
  matched_substrings: [
    {
      length: number;
      offset: number;
    },
  ];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: [
      {
        length: number;
        offset: number;
      },
    ];
    secondary_text: string;
    secondary_text_matched_substrings: [];
  };
  has_children: false;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  compound: {
    district: string;
    commune: string;
    province: string;
  };
  terms: [
    {
      offset: number;
      value: string;
    },
    {
      offset: number;
      value: string;
    },
    {
      offset: number;
      value: string;
    },
    {
      offset: number;
      value: string;
    },
    {
      offset: number;
      value: string;
    },
  ];
  types: ['building'];
  distance_meters: null;
}
