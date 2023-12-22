module.exports = async (policyContext, config, { strapi }) => {
  try {
    const ctx = policyContext;
    console.log("Trying is company member policy...");
    const userId = ctx.state.user.id;

    // Fetch the user with the company relation populated
    const userWithCompany = await strapi.entityService.findOne('plugin::users-permissions.user', userId, {
      populate: { company: true },
    });

    if (!userWithCompany || !userWithCompany.company) {
      return false; // User is not associated with any company
    }

    console.log("Userwithcompany: ", userWithCompany)

    ctx.state.userCompany = userWithCompany.company.id;

    return true;
  } catch (error) {
    strapi.log.error('isCompanyMember policy error:', error);
    return false;
  }
};
