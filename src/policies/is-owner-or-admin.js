

module.exports = async (policyContext, config, { strapi }) => {
  console.log("Attempting is-owner-or-admin policy...");
  const ctx = policyContext;
  if (!ctx.state.isAuthenticated) return false;
  
  const api = ctx.state.route.info.apiName;
  const controller = api; // Assume controller same as api name
  const service = strapi.service(`api::${api}.${controller}`);
  if (!service) return false;

  const recordId = ctx.params.id;

  if (!recordId) {
    // Assuming this is a 'find' action
    console.log("Route action is find")
    // Logic for list access
    // Fetch all shipments
    const { results: shipments } = await service.find({
      populate: { 
        owner: true, 
        product: true,
        company: { 
          populate: ["users", "admins"]
        } 
      }
    });

    console.log("Shipments: ", shipments)

    // Filter shipments based on user's access
    const accessibleShipments = shipments.filter(shipment => {
      const isOwner = shipment.owner && shipment.owner.id === ctx.state.user.id;
      const isAdmin = shipment.company && shipment.company.users.some(user => user.id === ctx.state.user.id && user.admin);
      //console.log("Is owner? ", isOwner)
      //console.log("Is admin? ", isAdmin)
      return isOwner || isAdmin;
    });

    console.log("Acc Shipments: ", accessibleShipments)

    // IMPORTANT: Check if the filtered list is empty
    if (accessibleShipments.length === 0) {
      return false; // No accessible shipments for the user
    }

    // Modify ctx.body to return only accessible shipments
    //ctx.body = { data: accessibleShipments, meta: { /* include relevant meta data here */ } };
    ctx.state.filteredShipments = accessibleShipments;
    return true;
  } else {
    // Assuming this is for actions like 'findOne', 'update', or 'delete'
    const { results: [shipment] } = await service.find({
      filters: { id: { $eq: recordId } },
      populate: { 
        owner: true, 
        product: true,
        company: { 
          populate: ["users", "admins"]
        } 
      }
    });

    if (!shipment) return false; // No shipment found

    console.log(shipment.company.users)

    const isOwner = shipment.owner && shipment.owner.id === ctx.state.user.id;
    const isAdmin = shipment.company && shipment.company.users.some(user => user.id === ctx.state.user.id && user.admin);

    if (isOwner || isAdmin) {
      // Set the filteredShipment in the context state
      ctx.state.filteredShipment = shipment;
      return true; // Allow access
    } else {
      return false; // Deny access if not owner or admin
    }
  }

};

