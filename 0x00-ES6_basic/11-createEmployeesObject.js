export default function createEmployeesObject(departmentName, employees) {
  const Object = {};
  Object[departmentName] = employees;
  return Object;
}
  