import { useState } from "react";
import { Ambulance, Shield, Phone, Plus, X } from "lucide-react";

interface EmergencyContact {
  id: string;
  name: string;
  type: "police" | "fire" | "medical" | "rescue";
  number: string;
  available: boolean;
}

// Dummy emergency contacts
const INITIAL_CONTACTS: EmergencyContact[] = [
  {
    id: "1",
    name: "City Police Department",
    type: "police",
    number: "100",
    available: true,
  },
  {
    id: "2",
    name: "Central Hospital",
    type: "medical",
    number: "+91 8054547879",
    available: true,
  },
  {
    id: "3",
    name: "Emergency Response Team",
    type: "rescue",
    number: "+1-555-0124",
    available: false,
  },
];

export default function EmergencyContacts() {
  const [contacts, setContacts] =
    useState<EmergencyContact[]>(INITIAL_CONTACTS);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState<Omit<EmergencyContact, "id">>({
    name: "",
    type: "police",
    number: "",
    available: true,
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.number) return;

    const contact: EmergencyContact = {
      id: Date.now().toString(),
      ...newContact,
    };

    setContacts((prev) => [...prev, contact]);
    setIsAddingContact(false);
    setNewContact({
      name: "",
      type: "police",
      number: "",
      available: true,
    });
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? { ...contact, available: !contact.available }
          : contact,
      ),
    );
  };

  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-lg border dark:border-gray-700">
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Emergency Contacts
        </h3>
        <button
          onClick={() => setIsAddingContact(true)}
          className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-full"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="divide-y dark:divide-gray-700">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {contact.type === "police" && (
                  <Shield className="h-6 w-6 text-blue-500" />
                )}
                {contact.type === "medical" && (
                  <Ambulance className="h-6 w-6 text-green-500" />
                )}
                {contact.type === "rescue" && (
                  <Phone className="h-6 w-6 text-yellow-500" />
                )}
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {contact.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {contact.number}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleAvailability(contact.id)}
                  className={`px-2 py-1 rounded-full text-xs ${
                    contact.available
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                  }`}
                >
                  {contact.available ? "Available" : "Busy"}
                </button>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Contact Modal */}
      {isAddingContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-black rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add Emergency Contact
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <select
                  value={newContact.type}
                  onChange={(e) =>
                    setNewContact((prev) => ({
                      ...prev,
                      type: e.target.value as EmergencyContact["type"],
                    }))
                  }
                  className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white"
                >
                  <option value="police">Police</option>
                  <option value="medical">Medical</option>
                  <option value="rescue">Rescue</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={newContact.number}
                  onChange={(e) =>
                    setNewContact((prev) => ({
                      ...prev,
                      number: e.target.value,
                    }))
                  }
                  className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsAddingContact(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddContact}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
