package om.magus.bd.entiry;

public class Menu {
	private long id;
	private int parentId;
	private int level;

	public long getId() {
		return id;
	}

	public void setId(long l) {
		this.id = l;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

}
