function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}

export default function getBudgetForCurrentYear(income, gdp, capita) {
  // const income = income
  // const gdp = gdp
  // const capita = capita

  const budget = {
    [income]: `income-${getCurrentYear()}`,
    [gdp]: `gdp-${getCurrentYear()}`,
    [capita]: `capita-${getCurrentYear()}`,
  };

  // budget[`income-${getCurrentYear()}`] = income;
  // budget[`gdp-${getCurrentYear()}`] = gdp;
  // budget[`capita-${getCurrentYear()}`] = capita;

  return budget;
}
