"use client";
import { useRouter } from 'next/navigation';
import { db } from '../../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const GroupChat = ({ params }) => {
  const { groupID } = params;
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupRef = doc(db, 'groups', groupID);
        const groupSnap = await getDoc(groupRef);

        if (groupSnap.exists()) {
          setGroupData(groupSnap.data());
        } else {
          console.error('Group not found');
        }
      } catch (error) {
        console.error('Error fetching group data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [groupID]);

  if (loading) {
    return <div>Loading group chat...</div>;
  }

  if (!groupData) {
    return <div>Group not found.</div>;
  }

  const shareLink = `http://localhost:3000/group/${groupID}`; // Update for your deployment

  return (
    <div>
      <h1>Group: {groupData.name || groupID}</h1>
      <p>This is your group chat!</p>
      <div className="mt-4">
        <p>Invite others to join using this link:</p>
        <input
          type="text"
          readOnly
          value={shareLink}
          className="border p-2 w-full"
        />
        <button
          onClick={() => navigator.clipboard.writeText(shareLink)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
