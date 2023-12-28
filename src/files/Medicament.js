
const listeDesMedicaments = [
    {
      categorie: 'Cardiologie',
      medicaments: [
        {
           nom:"Kardejic 160mg",
           prise:"1 fois par jour",
           duration:"à vie",
           prescrire:"chaque trois mois"
        },
        {
          nom:"Plavix 75mg",
          prise:"1 fois par jour",
          duration:"à vie",
          prescrire:"chaque trois mois"
        },
        {
          nom:"Tareg 100mg",
          prise:"2 fois par jour",
          duration:"à vie",
          prescrire:"chaque trois mois"
        },
        {
          nom:"Amep 5mg",
          prise:"1 fois par jour",
          duration:"à vie",
          prescrire:"chaque trois mois"
        },
        {
            nom:"Nolip",
            prise:"1 fois par jour",
            duration:"à vie",
            prescrire:"chaque trois mois"
        }
      ],
    },
    {
      categorie: 'Rhumatologie',
      medicaments: [
        {
            nom:"Cortancyle 5mg",
            prise:"2 fois par jour",
            duration:"à vie",
            sujet:"sujets non diabétique",
            prescrire:"prescrire chaque trois mois"
        },
        {
           nom:"Cataflam 100 mg",
           prise:"1 fois par jour",
           sujet:"sujets non diabétique",
           duration:"max 10jours",
           type:"anti inflammatoire"
        },
        {
            nom:"Dolicox 60mg",
            prise:"1 fois par jour",
            sujet:"",
            duration:"max 10jours",
            type:"anti inflammatoire"
        }
      ],
    },
    {
      categorie: 'Endocrinologie',
      medicaments: [
        {
            type:"Diabète type B",
            nom:"Novomix",
            prise:"2 injections par jour",
            duration:"à vie",
            prescrire:"chaque trois mois"
        },
        {
            type:"Diabète type B",
            nom:"Novorapid",
            prise:"3 injections par jour",
            duration:"à vie",
            prescrire:"chaque trois mois",
            plus:"novolent",
            plus_prise:" 1 injection le soir"
        },
        {
            type:"Diabète type A",
            nom:" Diaformine",
            prise:"3 comprimés par jour avec repas",
            duration:"à vie",
            prescrire:"chaque trois mois",
        }
      ],
    },
  ];

  export default listeDesMedicaments;